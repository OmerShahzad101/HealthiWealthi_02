const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const usersSchema = new mongoose.Schema({
  userName: { type: String, requires: true },
  password: { type: String, minlength: 6, maxlength: 128 },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  googleAccessToken: { type: String, default: "" },
  avatar: { type: String, default: "placeholder.png" },
  role: { type: String, default: "301" },
  isEmailVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdBY: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, requires: true, default: Date.now },

  allowWorkFlow: { type: Boolean, default: true },
  allowTemplate: { type: Boolean, default: true },
  allowDocument: { type: Boolean, default: true },
  allowUser: { type: Boolean, default: true },
  allowCompany: { type: Boolean, default: true },
});

usersSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password ? this.password : "");
};

module.exports = mongoose.model("user", usersSchema);
