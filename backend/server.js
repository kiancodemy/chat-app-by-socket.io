import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import cookieparse from "cookie-parser";
import dotenv from "dotenv";
import path, { dirname } from "path";

import { fileURLToPath } from "url";
import { createServer } from "http";
import router from "./router/Userroute.js";
import connect from "./config/db.js";
import chatrouter from "./router/chatroute.js";
import message from "./router/messageroute.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  })
);
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("setup", (id) => {
    console.log("setup" + id);
    socket.join(id);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("kir", (n) => {
    socket.emit("kos", n * 3);
  });
  socket.on("stoptyping", (room) => {
    socket.in(room).emit("stoptyping");
  });

  socket.on("join chat", (room) => {
    console.log("join chat" + room);
    socket.join(room);
  });
  socket.on("sendmessage", (newmessage) => {
    const chat = newmessage.chat;
    if (!chat.users) {
      console.log("no user");
      return;
    }

    chat.users.forEach((user) => {
      if (user._id === newmessage.sender._id) {
        return;
      }
      socket.in(user._id).emit("recieved", newmessage);
    });
  });
});

app.use(express.json());
app.use(cookieparse());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);
app.use("/chats", chatrouter);
app.use("/message", message);
connect();

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.mode === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
  });
}
console.log(path.join(__dirname, "..", "/frontend"));
httpServer.listen(process.env.PORT, () => {
  console.log("server started");
});
