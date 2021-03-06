import userClient from "../database/userClient.js";
import shortenerClient from "../database/shortenerClient.js";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

dotenv.config();
class UserController {
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  athUser(request, response) {
    const { auth } = request.headers;
    const [, hashcode] = auth.split(" ");
    let payload;

    try {
      payload = jsonwebtoken.verify(hashcode, process.env.WEBTOKEN);
    } catch (e) {
      return response.send("Error to verify token").status(401);
    }

    return payload;
  }

  async createUser(request, response) {
    const { name, email, password } = request.body;

    if (name && email && password) {
      // -> Create new user object
      const user = {
        _id: crypto.randomUUID(),
        name,
        email,
        password: this.hashPassword(password),
        created: Date.now(),
      };

      const dataverify = await userClient.getUser(email);
      if (dataverify.User)
        return response.send("This email already exist!").status(400);

      const data = await userClient.newUser(user);
      return response.send(data).status(200);
    }

    return response
      .send({
        Message: "Error: missing body data",
      })
      .status(400);
  }

  async updateUser(request, response) {
    const { id } = request.params;

    const auth = this.athUser(request, response);

    const { name, email, password } = request.body;

    if (!id || id != auth._id)
      return response
        .send({
          Message: "Error: missing data",
        })
        .status(400);

    const data = await userClient.getUser(auth._id);

    if (!data.status)
      return response
        .send({
          Message: "Error: userId not found",
        })
        .status(400);

    const user = {
      name: name ? name : data.name,
      email: email ? email : data.email,
      password: password ? password : data.password,
      modificated: Date.now(),
    };

    const res = await userClient.editUser(id, user);
    return response.send(res).status(200);
  }

  async deleteUser(request, response) {
    const { id } = request.params;

    const auth = this.athUser(request, response);

    if (!id || id != auth._id)
      return response
        .send({
          Message: "Error: missing data",
        })
        .status(400);

    const data = await userClient.deleteUser(id);

    /*
            Delete all user's shorteners
        */
    data.User.user_links.forEach((id) => {
      shortenerClient.deleteShortener(id);
    });

    return response.send(data).status(200);
  }

  async login(request, response) {
    const { email, password } = request.body;

    if (!email || !password) return response.send("Missing data").status(200);

    const data = await userClient.getUser(email);

    if (!data.User) return response.send("incorrect email or password");

    if (!bcrypt.compareSync(password, data.User.password))
      return response.send("incorrect email or password");

    const userToken = {
      _id: data.User._id,
    };
    const token = jsonwebtoken.sign(userToken, process.env.WEBTOKEN, {
      expiresIn: "3h",
    });
    data.User.activeSection = token;
    await data.User.save();

    response
      .setHeader("auth", "Bearer " + token)
      .send(token)
      .status(200);
  }
}

export default UserController;
