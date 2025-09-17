const express = require('express');
const session = require('express-session');
const MongoStore = require("connect-mongo")
const connectDB = require('./src/config/db');
const path = require("path");

const app = express();

// Database connection
connectDB();

// Middleware
app.use(express.json());
// app.use(cookieParser())
app.use(session({
  secret: 'Putkey',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    sameSite: 'lax',
    maxAge:60*1000
  },
  store:MongoStore.create({
    mongoUrl: "mongodb://localhost:27017/myproducts",
    collectionName:"sessions",
    ttl:60
  })
}));

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname,"public")))

// Routes
const authRoutes = require('./src/routes/authRoutes');
const otpRoutes = require('./src/routes/otpRoutes');
const productRoutes = require('./src/routes/productRoutes');
const userRoutes = require('./src/routes/userRoutes');

// Mount routes
app.use("/auth", authRoutes);
app.use("/otp", otpRoutes);
app.use("/users", userRoutes);
app.use("/products", productRoutes);


// Start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
