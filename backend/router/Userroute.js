import express from "express";
const router = express.Router();
import { register, login, getall } from "../controlers/usercontroler.js";
import { protect } from "../middleware/auth.js";
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/all").get(protect, getall);
export default router;
