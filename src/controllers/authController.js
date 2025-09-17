const { UserRole } = require("../constants/const");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const saltRounds = process.env.bcrypt_salt || 10;


// Register user
const register = async (req, res) => {
  const { username, password, email, contactNo, role } = req.body;

  if (!username || !email || !password || !contactNo) {
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
      contactNo,
      roles: role,
    });

    console.log(res);

    return res.status(201).json({
      msg: "User created",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        contactNo: user.contactNo,
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

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ msg: "please provide all required fields" });
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

    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      contactNo: user.contactNo,
      roles: user.roles,
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
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res
          .status(500)
          .json({ msg: "Internal server error", error: err });
      }
      res.clearCookie("connect.sid");
      return res.status(200).json({ msg: "User logged out successfully" });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
};

module.exports = { register, login, logout };
