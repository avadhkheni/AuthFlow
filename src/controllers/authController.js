// import User from "../models/userMod";
const User = require("../models/User")
const bcrypt = require("bcryptjs")
// import bcrypt from "bcryptjs";


// Register user

const register = async (req, res) => {
  try {
    const { username, email, password , role } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

 if(role === USER_ROLES.ADMIN)return res.status(403).json({msg:"You cannot register"})

    const user = await User.create({ username, email, password ,roles:role});
    return res.status(201).json({ msg: "User created", data: { username: user.username, email: user.email } });
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

// Login user

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await User.findOne({
      $or:[{username: identifier}, {email: identifier}]
    });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
      if(user.password !== password)return res.status(401).json({ msg: "Invalid password" });
      
     req.session.user = {
         id: user._id, 
         username: user.username, 
         email: user.email 
        }; 
      return res.status(200).json({ msg: "User logged in successfully", user: req.session.user });
  } 
  catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
}

// Logout user

const logout = (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error", error: err });
      }
      res.clearCookie('connect.sid');
      return res.status(200).json({ msg: "User logged out successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
}

// profile

    const profile =(req,res)=>{
      if (!req.user) {
        return res.status(401).json({ msg: "User not authenticated" });
      }

      res.status(200).json({
        msg:"User profile retrieved successfully",
        data:{
          username: req.user.username,
          email: req.user.email
        }
      })
    }

export { register, login, logout, profile };
