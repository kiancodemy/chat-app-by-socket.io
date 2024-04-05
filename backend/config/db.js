import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.ADDRESS);
    console.log("connectes to mongo db");
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};
export default connect;
