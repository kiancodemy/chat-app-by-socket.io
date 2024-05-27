import { Chat } from "../model/chatmode.js";
import { User } from "../model/usermodel.js";
//access chat//
export const acceschat = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("there is no user id!!!");
    }

    const find = await Chat.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } },
        { users: { $elemMatch: { $eq: id } } },
      ],
    })
      .populate("users", "-password")

      .populate("latestMessage");

    const all = await User.populate(find, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    if (all.length > 0) {
      res.status(200).send(all[0]);
    } else {
      var chat = {
        chatName: "sender",
        isGroup: false,
        users: [req.user._id, id],
      };
      const create = await Chat.create(chat);
      const chatfinder = await Chat.findById(create._id);
      res.status(200).send(chatfinder);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

////fetch////
export const fetch = async (req, res) => {
  try {
    const query = Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({
        updatedAt: -1,
      });

    const all = await User.populate(query, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    res.status(201).json(all);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createGroup = async (req, res) => {
  try {
    if (!req.body.name || !req.body.users) {
      throw new Error("there is not information");
    }
    let user = req.body.users;
    if (user.length < 2) {
      throw new Error("more than one user is needed");
    }
    user.push(req.user._id);
    const create = await Chat.create({
      chatName: req.body.name,
      isGroup: true,
      users: user,
      groupAdmin: req.user._id,
    });

    const full = await Chat.findById(create._id)
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json(full);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
///rename//
export const rename = async (req, res) => {
  try {
    const { id, name } = req.body;
    const find = await Chat.findByIdAndUpdate(
      id,
      { chatName: name },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!find) {
      throw new Error("there is not chat");
    }

    res.status(201).json(find);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

///add to group//

export const addtogroup = async (req, res) => {
  try {
    const { chatid, user } = req.body;
    const find = await Chat.findByIdAndUpdate(
      chatid,

      { $push: { users: user } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!find) {
      throw new Error("no user found ");
    }
    res.status(200).json(find);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const removegroup = async (req, res) => {
  try {
    const { chatid, user } = req.body;
    const find = await Chat.findByIdAndUpdate(
      chatid,

      { $pull: { users: user } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    if (!find) {
      throw new Error("no user found ");
    }
    res.status(200).json(find);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
