import { Router } from "express";
import ShortenerController from "../controller/shortenerController.js";

const router = Router();
const shortenerController = new ShortenerController();

router.post("/create", shortenerController.create.bind(shortenerController));
router.get("/:hash", shortenerController.redirect.bind(shortenerController));
router.delete("/delete");

export default router;
