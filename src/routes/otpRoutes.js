const express = require("express");
const otpContrllers = require("../controllers/otpContrllers")
const router = express.Router();


// send OTP to User
router.post("/send-otp", otpContrllers.sendOTP);

// Verify OTP
router.post("/verify-otp", otpContrllers.VerifyOTP);


module.exports = router;