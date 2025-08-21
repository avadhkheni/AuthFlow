const createAdmin = async (req, res) => {
  try {
    // const { username, email, password ,  } = req.body;

    const username = prompt("Enter admin username");
    const email = prompt("Enter admin email");
    const password = prompt("Enter admin password");

    if (!username || !email || !password) {
      return res.status(400).json({ msg: "Please provide all required fields" });
    }
    // Hash the password before saving
    // const hashedPassword = await bcrypt.hash(password, 10);

    

    const user = await User.create({ username, email, password ,});
    return res.status(201).json({ msg: "User created", data: { username: user.username, email: user.email } });
      
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

createAdmin()