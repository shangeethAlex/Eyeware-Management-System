const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  code: String,
  name: String,
  value: Number,
  description: String,
  status: String,
  couponType: String,
  minOrder: Number,
  maxOrder: Number,
  restrictEmail: String,
  noItem: Number,
  usageLimit: Number,
  couponQuantity: Number,
  startDate: Date,
  endDate: Date,
  userLimit: Number,
  couponRestriction: String,
});

const UserModel = mongoose.model("coupons", userSchema);
module.exports = UserModel;
