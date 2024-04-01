import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { chats } from "./data/data.js";
const app = express();
app.get("/chat/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const find = chats.find((a) => a._id === id);
    if (find) {
      res.send(find);
    } else {
      throw new Error("nothing found");
    }
  } catch (err) {
    res.send(err.message);
  }
});
app.get("/chat", async (req, res) => {
  try {
    res.send(chats);
  } catch (err) {
    res.send(err.message);
  }
});

app.listen(process.env.PORT, () => {
  console.log("server started");
});
