import { User } from "../model/usermodel.js";
import { generator } from "../utils/jwt.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    if (!name || !email || !password) {
      throw new Error("data is not valid ");
    }
    const find = await User.findOne({ email });
    if (find) {
      throw new Error("User with this Email already exist ! try again");
    }

    const newUser = await User.create({ name, email, password, image });

    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
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
    const Users = await User.findOne({ email });
    if (!Users) {
      throw new Error("User not found");
    }
    const validPassword = await bcrypt.compare(password, Users.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }
    const token = generator(Users._id);

    await res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: 36000000,
      secure: process.env.NODE_ENV !== "development",
    });

    res.status(200).json({
      _id: Users._id,
      name: Users.name,
      email: Users.email,
      token,
    });
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export const getall = async (req, res) => {
  try {
    let keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};

    const find = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    if (!find) {
      throw new Error("no user found");
    }
    res.status(201).json(find);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};
