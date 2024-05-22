import mongoose from "mongoose";

const connect = async () => {
  try {
    await mongoose.connect(process.env.ADDRESS);
    console.log("connectes succesfully to mongo db server");
  } catch (err) {
    console.log(err.message);
    process.exit();
  }
};
export default connect;
