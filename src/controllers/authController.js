const { UserRole } = require("../constants/const");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.bycrypt_solt;

// Register user

const register = async (req, res) => {
  const { username, password, email, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ msg: "Please provide all required fields" });
  }
  try {
    if (role === UserRole.ADMIN)
      return res.status(403).json({ msg: "You cannot register" });

    const hashedpassword = bcrypt.hashSync(password, saltRounds);

    const user = await User.create({
      username,
      email,
      password: hashedpassword,
      roles: role,
    });

    return res.status(201).json({
      msg: "User created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        roles: user.roles,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error: error });
  }
};

// Login user

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!req.body) {
      return res.status(400).json({ msg: "Missing request body" });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const ispasswordisok = bcrypt.compareSync(password, user.password);
    if (!ispasswordisok)
      return res.status(401).json({ msg: "password is Worng" });

    // if (user.password !== password)
    //   return res.status(401).json({ msg: "Invalid password" });

    req.session.user = {
      id: user._id,
      username: user.username,
    };

    return res
      .status(200)
      .json({ msg: "User logged in successfully", user: req.session.user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ msg: "Login failed", error });
  }
};

// Logout user

const logout = (req, res) => {
  try {
    req.session
      .destroy
      // (err) => {
      //   if (err) {
      //     console.error(err);
      //     return res
      //       .status(500)
      //       .json({ msg: "Internal server error", error: err });
      //   }
      //   res.clearCookie("connect.sid");
      //  }
      ();
    return res.status(200).json({ msg: "User logged out successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

// profile

// const profile = (req, res) => {
//   if (!req.user) {
//     return res.status(401).json({ msg: "User not authenticated" });
//   }

//   res.status(200).json({
//     msg: "User profile retrieved successfully",
//     data: {
//       username: req.user.username,
//       email: req.user.email,
//     },
//   });
// };

module.exports = { register, login, logout };
