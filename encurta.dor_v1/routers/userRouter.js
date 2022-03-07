
import { Router } from "express";
import UserController from "../controller/userController.js"

const router = Router()

const userControler = new UserController

router.post("/api/update/:id", userControler.updateUser.bind(userControler))

router.get("/api/new", userControler.createUser.bind(userControler))

router.delete("/api/delete", userControler.deleteUser.bind(userControler))
