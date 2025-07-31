const express = require('express');
const connectDB = require('./src/config/db');

const app = express();
app.use(express.json());

connectDB();

const authRoutes = require('./src/auth/routes');
const productRoutes = require('./src/products/routes');
const userRoutes = require('./src/Users/routes');

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
