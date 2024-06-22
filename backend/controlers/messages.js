import { Message } from "../model/messagemodel.js";
import { Chat } from "../model/chatmode.js";

import { User } from "../model/usermodel.js";
export const allmessage = async (req, res) => {
  try {
    const find = await Message.find({ chat: req.params.id })
      .populate("sender", "name email image")
      .populate("chat");

    res.status(201).json(find);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const sendmessage = async (req, res) => {
  try {
    const { content, id } = req.body;
    if (!content || !id) {
      throw new Error("there is not information");
    }

    let newchat = {
      sender: req.user._id,
      content: content,
      chat: id,
    };
    let create = await Message.create(newchat);
    create = await create.populate("sender", "name email image");
    create = await create.populate("chat");
    create = await User.populate(create, {
      path: "chat.users",
      select: "name email image",
    });

    await Chat.findByIdAndUpdate(id, {
      latestMessage: create,
    });
    res.status(201).json(create);
  } catch (err) {
    res.status(404).json({
      meesage: err.message,
    });
  }
};
