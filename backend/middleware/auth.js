import jwt from "jsonwebtoken";
import { User } from "../model/usermodel.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    token = await req.cookies.jwt;
    if (!token) {
      throw new Error("you are not login ");
    }

    const { id } = jwt.verify(token, process.env.SECRET);
    if (!id) {
      throw new Error("Log in please");
    }
    req.user = await User.findById(id).select("-password");

    next();
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};
