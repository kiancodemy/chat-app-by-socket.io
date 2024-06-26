import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const usermodel = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },

    image: {
      type: String,
      require: true,
      default: "https://100k-faces.glitch.me/random-image",
    },
  },
  { timestamps: true }
);
usermodel.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
export const User = mongoose.model("User", usermodel);
