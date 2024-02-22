import mongoose from "mongoose";
import dotenv from "dotenv";

// init
dotenv.config();

//ORM config
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    console.log("Connected to database");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

export default connectDB;
