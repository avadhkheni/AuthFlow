const express = require('express');
const connectDB = require('./src/config/db');
// const mongoose = require('mongoose');


const app = express();
app.use(express.json());

connectDB();
const authRoutes = require('./src/auth/routes');
app.use("/api/auth", authRoutes);

const productRoutes = require('./src/products/routes');
app.use("/api/products", productRoutes);

 const userRoutes = require('./src/Users/routes');
 app.use("/api/users", userRoutes);


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
