import UserEntity from "../entities/user.entity";

require("dotenv").config();
const otpGenerator = require("otp-generator");
const Otp = require("../entities/otp.entity");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create OTP
export const generateOtp = () => {
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

export const generateToken = (user: UserEntity) => {
  return jwt.sign(
    {
      id: user.id,
      indangamuntu: user.nationalId,
      role: user.role,
      verified: user.verified,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );
};