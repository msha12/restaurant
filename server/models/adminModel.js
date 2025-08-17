const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'modetor'], default: 'modetor' },
  token: { type: String }
}, { timestamps: true });

const Admin = mongoose.model("Admin", userSchema);

module.exports = Admin