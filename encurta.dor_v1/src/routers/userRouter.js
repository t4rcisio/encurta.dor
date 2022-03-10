import {
    Router
} from "express";
import UserController from "../controller/userController.js"

const router = Router()

const userControler = new UserController


router.post("/new", userControler.createUser.bind(userControler))
router.post("/update/:id", userControler.updateUser.bind(userControler))
router.delete("/delete/:id", userControler.deleteUser.bind(userControler))
router.post("/login", userControler.login.bind(userControler))



export default router