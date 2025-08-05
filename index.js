const express = require('express');
const session = require('express-session');
const connectDB = require('./src/config/db');

const app = express();
app.use(express.json());
app.use(session({
  secret: 'ojefCCESQ8',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: false, sameSite: 'Lax' } 
}));

connectDB();

const authRoutes = require('./src/auth/routes');
const productRoutes = require('./src/products/routes');
const userRoutes = require('./src/Users/routes');

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
