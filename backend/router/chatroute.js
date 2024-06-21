import express from "express";
import { protect } from "../middleware/auth.js";

import {
  addtogroup,
  removegroup,
  acceschat,
  fetch,
  createGroup,
  rename,
} from "../controlers/chatcontrolers.js";
const router = express.Router();
router.route("/").post(protect, acceschat);
router.route("/").get(protect, fetch);
router.route("/group").post(protect, createGroup);
router.route("/rename").put(protect, rename);
router.route("/add").put(protect, addtogroup);
router.route("/remove").delete(protect, removegroup);
export default router;
