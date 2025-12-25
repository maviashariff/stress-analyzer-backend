import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Result from "./models/Result.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "./models/Admin.js"; // make sure this import is at the top
import verifyAdmin from "./middleware/verifyAdmin.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

// Submit a new result
app.post("/submit", async (req, res) => {
  try {
    const newResult = new Result(req.body);
    await newResult.save();
    res.status(201).json({ message: "Result saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get leaderboard (lowest stress first)
app.get("/leaderboard", async (req, res) => {
  try {
    const topResults = await Result.find().sort({ stressScore: 1 }).limit(60);
    res.json(topResults);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Login Route
app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find admin in DB
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }

  // Delete a single result
  app.delete("/admin/delete/:id", verifyAdmin, async (req, res) => {
    try {
      await Result.findByIdAndDelete(req.params.id);
      res.json({ message: "Entry deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });

  // Clear all results
  app.delete("/admin/clear", verifyAdmin, async (req, res) => {
    try {
      await Result.deleteMany({});
      res.json({ message: "Leaderboard cleared" });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  });
});

app.listen(5000, () => console.log("🚀 Server running on port 5000"));
