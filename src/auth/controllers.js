const User = require("../Users/model");

// const register = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ msg: "Please provide all required fields" });
//     }

//     // Here you would typically hash the password and save the user to the database
//     // For simplicity, we are just returning a success message
//     res.status(201).json({ msg: "User registered successfully", data: { name, email, password } });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ msg: "Internal server error", error });
//   } 
// }

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }

    const user = await User.create({ username, email, password });
    return res.status(201).json({ msg: "User created", data: user });
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }
    return res.status(200).json({ msg: "User logged in successfully", data: { email, password } });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error", error });
  }
}
const logout = (req, res) => {  
    try {
        return res.status(200).json({ msg: "User logged out successfully" });
    
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Internal server error", error });
    }
    }

module.exports = { register, login, logout };