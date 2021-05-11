import mongoose from "mongoose";
import getCurrentDate from "../date.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true },
  id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: getCurrentDate() },
  saving: [{ type: Schema.Types.ObjectId, ref: "Saving" }],
  paying: [{ type: Schema.Types.ObjectId, ref: "Paying" }],
  budget: [{ type: Schema.Types.ObjectId, ref: "Budget" }],
  token: String,
});

UserSchema.pre("save", function (next) {
  let user = this; // user에 userShcema를 할당함

  // 비밀번호를 입력한 경우 혹은 비밀번호를 변경할 경우 실행
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        // 회원가입, 비밀번호 변경 => user.save()를 실행
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (plainPassword, cb) {
  let user = this;
  bcrypt.compare(plainPassword, user.password, function (err, result) {
    if (err) return cb(err);
    return cb(null, result);
  });
};

UserSchema.methods.generateToken = function () {
  let user = this;
  let token = jwt.sign(user._id.toJSON(), process.env.TOKEN);
  user.token = token;
  user.save();
};

// 여기서 this는 모델 자체를 가리킨다.
UserSchema.statics.findByToken = function (token, cb) {
  let user = this;
  let decoded = jwt.verify(token, process.env.TOKEN);
  user.findOne({ _id: decoded, token: token }, (err, user) => {
    if (err) return cb(err);
    cb(null, user);
  });
};

const model = mongoose.model("User", UserSchema);
export default model;
