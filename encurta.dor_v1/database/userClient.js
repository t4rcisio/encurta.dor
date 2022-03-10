/*
    -> Install mongodb
    -> import dotenv
        -> to read .env file

*/

import usermodel from "../model/userModel.js"


const response = {
    "User": null,
    "status": null,
    "Date": null
};

const db = {
    async getUser(email) {
        try {
            response.User = await usermodel.findOne({
                email
            })
            response.status = true
        } catch (error) {
            response.User = error;
            response.status = false
        } finally {
            response.Date = Date.now()
            return response;

        }

    },
    async newUser(user) {
        try {
            response.User = await usermodel.create(user)
            response.status = true
        } catch (error) {
            response.User = error;
            response.status = false
        } finally {
            response.Date = Date.now()
            return response;
        }

    },
    async editUser(_id, newData) {

        try {
            response.User = await usermodel.findByIdAndUpdate({
                _id
            }, newData, {
                new: true
            })
            response.status = true
        } catch (error) {
            response.User = error;
            response.status = false
        } finally {
            response.Date = Date.now()
            return response;
        }


    },
    async deleteUser(_id) {
        try {
            response.User = await usermodel.findByIdAndDelete({
                _id
            })
            response.status = true
        } catch (error) {
            response.User = error;
            response.status = false
        } finally {

            response.Date = Date.now()
            return response;
        }
    },

    async session(activeSection) {
        try {
            response.User = await usermodel.findOne({
                activeSection
            })
            response.status = true
        } catch (error) {
            response.User = error;
            response.status = false
        } finally {

            response.Date = Date.now()
            return response;
        }
    }

}


export default db;