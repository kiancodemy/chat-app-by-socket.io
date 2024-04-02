import mongoose from "mongoose";
const { Schema } = mongoose;

const usermodel = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String },
    password: { type: String },
    sender: { type: mongoose.ObjectId, ref: "User" },
    pic: {
      type: String,
      require: true,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
  },
  { timestamps: true }
);
export const user = mongoose.model("User", usermodel);
