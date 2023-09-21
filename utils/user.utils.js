require("dotenv").config();
const otpGenerator = require("otp-generator");
const Otp = require("../models/otp.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create OTP
const generateOtp = () => {
  try {
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      digits: true,
    });
    console.log(otp);
    return otp;
  } catch (e) {
    console.log(e);
    return "Error while generating OTP...";
  }
};

// Sending message to 4ne number
const sendOtp = async (phoneNumber) => {
  try {
    
  } catch (error) {
    return "Error while sending OTP...";
  }
};

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      indangamuntu: user.indangamuntu,
      verified: user.verified,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};

module.exports = {
  generateOtp,
  sendOtp,
  generateToken,
};
