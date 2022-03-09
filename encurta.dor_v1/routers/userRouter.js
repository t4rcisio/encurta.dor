
import { Router } from "express";
import UserController from "../controller/userController.js"

const router = Router()

const userControler = new UserController


router.post("/new", userControler.createUser.bind(userControler))
router.post("/update/:id", userControler.updateUser.bind(userControler))
router.delete("/delete", userControler.deleteUser.bind(userControler))



export default router