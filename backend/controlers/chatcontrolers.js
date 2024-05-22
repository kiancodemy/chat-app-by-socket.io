import { Chat } from "../model/chatmode.js";
import { User } from "../model/usermodel.js";

export const acceschat = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      throw new Error("there is no user id!!!");
    }
    const find = Chat.find({
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
      const chatfinder = await Chat.findOne({ _id: create._id });
      res.status(200).send(chatfinder);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const fetch = async (req, res) => {
  try {
    const query = Chat.find({
      users: { $elemMatch: { $eq: req.user._id } },
    })
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({
        updatedAt: -1,
      });

    const all = await User.populate(query, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    const send = await res.status(201).json(all);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const  create=(req,res)=>{
  try{
    if(!req.body.name ||!req.body.users){
      throw new Error('there is not information')

    }
    let user=JSON.parse(req.body.users)
    if(user.length<2){
      throw new Error('moer than two user is needed')
    }
    await user.push(req.user);
    const create=await Chat.create({chatName:req.body.name,
      isGroup:true,
      users:user,
      groupAdmin:req.user._id})

    const full=await Chat.findById(create._id).populate('users','-password').populate(
      'groupAdmin','-password'
    )

    res.status(200).json(full)
    
   

  }

}