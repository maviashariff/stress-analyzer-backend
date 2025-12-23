import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  name: String,
  ageGroup: String,
  stressScore: Number,
  mood: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("Result", resultSchema);
