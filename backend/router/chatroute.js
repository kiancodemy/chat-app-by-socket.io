import express from "express";
import { acceschat } from "../controlers/chatcontrolers.js";
import { protect } from "../middleware/auth.js";
import { fetch } from "../controlers/chatcontrolers.js";
const router = express.Router();
router.route("/").post(protect, acceschat);
router.route("/").get(protect, fetch);
/*router.route("/group").post(protect, creategroup);
router.route("/rename").put(protect, renamegroup);
router.route("/remove").put(protect, removegroup);
router.route("/add").put(protect, addgroup);*/
export default router;
