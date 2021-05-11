import mongoose from "mongoose";
import getCurrentDate from "../date.js";

const Schema = mongoose.Schema;

// saving => 연간 데이터로 산출하고, 월간 정보로 입력 받을 것

const SavingSchema = new Schema({
  createdAt: { type: Date, default: getCurrentDate() },
  date: { type: Date, default: getCurrentDate() },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  memo: { type: String },
  user: [{ type: Schema.Types.ObjectId, ref: "User", require: true }],
  category: [
    { type: Schema.Types.ObjectId, ref: "SavingGoal", required: true },
  ],
});

const model = mongoose.model("Saving", SavingSchema);
export default model;
