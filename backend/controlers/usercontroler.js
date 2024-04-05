import { user } from "../model/usermodel.js";
import { generator } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    if (!name || !email || !password) {
      throw new Error("data is not valid ");
    }
    const find = await user.findOne({ email });
    if (find) {
      throw new Error("User with this Email already exist ! try again");
    }

    const newUser = await user.create({ name, email, password, image });
    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        image: newUser.image,
      });
    }
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await user.findOne({ email });
    if (!User) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, User.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const token = generator();

    res.status(200).json({
      token,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
