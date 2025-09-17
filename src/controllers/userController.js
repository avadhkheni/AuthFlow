const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = parseInt(process.env.BCRYPT_SALT) || 10;
// const saltRounds = process.env.bcrypt_salt;
// const mongoose  = require("mongoose")

// Get all users
const getAll = async (req, res) => {
  
  try {
    const users = await User.find();
    return res.status(200).json({
      data: users,
      msg: "All users",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: "Internal server error ",
      error: error,
    });
  }
};

// Get one user by ID
const getOne = async (req, res) => {

  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ msg: "User not found" });
    return res.json({ data: user, msg: "User found" });
  } catch (error) {
        console.error(error);
       return res.status(200).json({ msg: "Internal server error", error: error});
  }
};

//Update one user
const updateOne = async (req, res) => {
  try {
    const  id  = req.params["id"];

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
  const { username , email } = req.body;

    await User.findOneAndUpdate({_id:id},{username,email},  { new: true }  )

    return res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    console.error("Update error:", error);
    return res.status(500).json({
      msg: "Failed to update",
      error: error.message,
    });
  }
};

// Delete one user
const deleteOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
    if(!user)return res.status(404).json({msg:"user not found"})
    const result = await User.findByIdAndDelete(id);
    return res.status(200).json({ msg: `User deleted successfully, ${JSON.stringify(result)}` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
       msg: "Internal server error",
       error: error
      });
  }
};

module.exports = { getAll, getOne, updateOne, deleteOne };


//xxxxxxxxxxxxxxxxxxxxxx
// Update one user
// const updateOne = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { username, email, password, currentPassword } = req.body;

    
//     const user = await User.findById(id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     if (password) {
//       if (!currentPassword) {
//         return res.status(400).json({ msg: "Current password required to update" });
//       }

//       const isPasswordOk = await bcrypt.compareSync(currentPassword, user.password);
//       if (!isPasswordOk) {
//         return res.status(401).json({ msg: "Wrong current password" });
//       }

//       user.password = await bcrypt.hash(password, saltRounds);
//     }

//     if (username) user.username = username;
//     if (email) user.email = email;

//     await user.save();

//     return res.status(200).json({ msg: "User updated successfully" });
//   } catch (error) {
//     console.error("Update error:", error);
//     return res.status(500).json({ msg: "Failed to update", error: error.message });
//   }
// };