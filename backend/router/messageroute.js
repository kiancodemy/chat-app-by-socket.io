import express from "express";
const router = express.Router();
import { sendmessage, allmessage } from "../controlers/messages.js";
import { protect } from "../middleware/auth.js";
router.route("/").post(protect, sendmessage);
router.route("/:id").get(protect, allmessage);
export default router;
