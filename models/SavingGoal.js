import mongoose from "mongoose";
import getCurrentDate from "../date.js";

const Schema = mongoose.Schema;

const SavingGoalSchema = new Schema({
  createdAt: { type: Date, default: getCurrentDate() },
  date: { type: Date, default: getCurrentDate() },
  title: { type: String },
  price: { type: Number },
  categoryPrice: { type: Number },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const model = mongoose.model("SavingGoal", SavingGoalSchema);
export default model;
