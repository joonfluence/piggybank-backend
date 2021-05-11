import mongoose from "mongoose";
import getCurrentDate from "../date.js";

const Schema = mongoose.Schema;

// paying => 월간 데이터로 산출하고, 일간 정보로 입력 받을 것

const PayingSchema = new Schema({
  createdAt: { type: Date, default: getCurrentDate() },
  date: { type: Date, required: true, default: getCurrentDate() },
  title: { type: String, required: true },
  memo: { type: String },
  price: { type: Number, required: true },
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  category: [{ type: Schema.Types.ObjectId, ref: "Budget" }],
});

const model = mongoose.model("Paying", PayingSchema);
export default model;
