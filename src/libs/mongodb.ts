import { log } from "console";
import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    log("Connected to MongoDB.");
  } catch (error) {
    log(error);
  }
};

export default connectMongoDB;
