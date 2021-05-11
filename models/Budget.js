import mongoose from "mongoose";
import getCurrentDate from "../date.js";

const Schema = mongoose.Schema;

const BudgetSchema = new Schema({
  createdAt: { type: Date, default: getCurrentDate() },
  date: { type: Date, default: getCurrentDate() },
  title: { type: String },
  price: { type: Number },
  categoryPrice: { type: Number },
  remained: { type: Number },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const model = mongoose.model("Budget", BudgetSchema);
export default model;
