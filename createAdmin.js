import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    const username = "mavadmin"; // change this if you want
    const plainPassword = "mavia123"; // change this before running

    const existingAdmin = await Admin.findOne({ username });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists!");
      process.exit(0);
    }

    const passwordHash = await bcrypt.hash(plainPassword, 10);
    const newAdmin = new Admin({ username, passwordHash });
    await newAdmin.save();

    console.log(`✅ Admin user created: ${username}`);
    console.log("👉 You can now log in using this account later.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();
