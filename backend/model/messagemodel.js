import mongoose from "mongoose";
const { Schema } = mongoose;

const messagemodel = new Schema(
  {
    sender: { type: mongoose.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messagemodel);
