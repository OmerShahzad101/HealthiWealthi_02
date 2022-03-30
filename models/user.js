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
  role: { type: String },
  isEmailVerified: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true },
  createdBY: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  createdAt: { type: Date, requires: true, default: Date.now },

  allowUser: { type: Boolean, default: true },
});

usersSchema.methods.verifyPassword = function verifyPassword(password) {
  return bcrypt.compareSync(password, this.password ? this.password : "");
};

module.exports = mongoose.model("user", usersSchema);
