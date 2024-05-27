import express from "express";
const router = express.Router();
import {
  register,
  login,
  getall,
  logout,
} from "../controlers/usercontroler.js";
import { protect } from "../middleware/auth.js";
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/all").get(protect, getall);
router.route("/logout").post(protect, logout);
export default router;
