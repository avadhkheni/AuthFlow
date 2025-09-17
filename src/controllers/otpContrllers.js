const User = require("../models/User");
const OTP_STORE = {}

// Send OTP to user
const sendOTP = async (req,res)=>{
  const{email} =req.body;
  if(!email)return res.status(400).json({msg:" please provide email "});
  const isUser =await User.exists({email:email})
  if(!isUser){
    return res.status(404).json({msg:" user not found "})
  }
  const otp =Math.floor(1000+Math.random()*9000)
    // sendEmail(email)

  OTP_STORE[email] = { 
    otp: otp, 
    inVerifide: false,
    createdAt: Date.now() }
  
  return res.status(200).json({msg:" otp send to email " ,otp:otp})
}

//Verify OTP

const VerifyOTP = (req,res)=>{   

    const{email,otp}=req.body;

    if(!email || !otp){
        return res.status(400).json({msg:" please provide email and OTP"})
    };

    if(!OTP_STORE[email]) {
        return res.status(400).json({msg:" no OTP request found for this email"})
    };

    const storedOTP = OTP_STORE[email].otp;
    const expiresAt = OTP_STORE[email].expiresAt;

    if(expiresAt && Date.now() > expiresAt) {
        delete OTP_STORE[email];
        return res.status(400).json({msg:"OTP expired, request a new one"})
    }

    if (String(storedOTP)!==String(otp)) {
        return res.status(400).json({msg:"invalid OTP"})
    }
    
    OTP_STORE[email]["isVerified"] = true;

    res.status(200).json({msg:"OTP verified successfully" });
}


module.exports = {sendOTP, VerifyOTP};