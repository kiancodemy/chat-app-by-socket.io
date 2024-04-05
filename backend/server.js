import express from "express";

import dotenv from "dotenv";
import router from "./router/Userroute.js";
import connect from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users", router);
connect();
app.listen(process.env.PORT, () => {
  console.log("server started");
});
