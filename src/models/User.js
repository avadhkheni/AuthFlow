const mongoose = require("mongoose");
const UserRole = require("../constants/const");
const Product = require("./Product");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please provide a username"],
    unique: [true, "username must be unique"],
    // match: [/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers"],
  },

  password: {
    type: String,
    unique: false,
  },
  // createdAt: { type: Date, default: Date.now }
  contactNo: Number,
  email: {
    type: String,
    required: [true, "please provide an email"],
    unique: true,
    //  match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"]
  },
  Products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  role: {
    type: Number,
    enum: [UserRole.ADMIN, UserRole.BUYER, UserRole.SELAER],
    default: UserRole.BUYER,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
