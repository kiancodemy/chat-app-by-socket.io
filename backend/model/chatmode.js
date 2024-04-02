import mongoose from "mongoose";
const { Schema } = mongoose;

const chatmodel = new Schema(
  {
    chatName: { type: String, trim: true },
    isGroup: { type: Boolean, default: false },
    users: [{ type: mongoose.ObjectId, ref: "User" }],
    latestMessage: { type: mongoose.ObjectId, ref: "Message" },
    groupAdmin: { type: mongoose.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
export const Chat = mongoose.model("Chat", chatmodel);
