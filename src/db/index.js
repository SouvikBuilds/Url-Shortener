import { config } from "../config/config.js";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.MONGO_URI}/${config.DB_NAME}`,
    );
    console.log(
      `\n MongoDB Connected !!! DB Host:${connectionInstance.connection.host}`,
    );
  } catch (error) {
    console.log("Error Occured while connecting DB ", error);
    process.exit(1);
  }
};
