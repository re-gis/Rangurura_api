require("dotenv").config();
const twilio = require("twilio")(process.env.SID, process.env.AUTH_TOKEN);
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
    return {
      message: "Error while generating OTP...",
    };
  }
};

// Sending message to 4ne number
const sendOtp = async (phoneNumber) => {
  try {
    const otp = generateOtp();
    const existingOtp = await Otp.findOne({
      where: {
        number: phoneNumber,
      },
    });

    if (existingOtp)
      return {
        message: "Account already created, verify to continue...",
      };

    const hashedOtp = await bcrypt.hash(otp, 10);
    // save the otp
    const otpToSave = new Otp({
      number: phoneNumber,
      otp: hashedOtp,
    });

    otpToSave.save();
    await twilio.messages.create({
      body: `Kode yawe yo muri Rangurura ni ${otp}`,
      to: phoneNumber,
      from: "+12765985304",
    });
  } catch (error) {
    console.log(error);
    return {
      message: "Error while sending OTP...",
    };
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
