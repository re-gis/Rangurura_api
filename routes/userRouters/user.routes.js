const express = require("express");
const {
  registerUser,
  loginUser,
  verifyOtp,
} = require("../../controllers/users/user.controller");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify", verifyOtp)

module.exports = userRouter;
