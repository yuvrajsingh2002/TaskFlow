import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await User.findOne({
      email: "admin@taskflow.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 10);

    await User.create({
      name: "TaskFlow Admin",
      email: "admin@taskflow.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error("Admin creation failed:", error.message);
    process.exit(1);
  }
};

createAdmin();