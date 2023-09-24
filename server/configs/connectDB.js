import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.BD_URI);
    console.log("DB connection successfull!🎉");
  } catch (error) {
    console.log("Fail to connect with DB!🙁");
  }
};
