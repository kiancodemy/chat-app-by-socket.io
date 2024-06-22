import express from "express";
import cors from "cors";
import cookieparse from "cookie-parser";
import dotenv from "dotenv";
import router from "./router/Userroute.js";
import connect from "./config/db.js";
import chatrouter from "./router/chatroute.js";
import message from "./router/messageroute.js";
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieparse());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);
app.use("/chats", chatrouter);
app.use("/message", message);
connect();
app.listen(process.env.PORT, () => {
  console.log("server started");
});
