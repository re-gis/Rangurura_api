const express = require("express");
const {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
} = require("../../controllers/users/user.controller");
const protect = require("../../middlewares/auth.user");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify", verifyOtp);
userRouter.post("/resendOtp", resendOtp);
userRouter.put("/:id/passReset")

module.exports = userRouter;
