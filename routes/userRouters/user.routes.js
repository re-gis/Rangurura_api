const express = require("express");
const {
  registerUser,
  loginUser,
  verifyOtp,
  resendOtp,
  createALeader,
} = require("../../controllers/users/user.controller");
const { protect, role } = require("../../middlewares/auth.user");
const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/verify", verifyOtp);
userRouter.post("/resendOtp", resendOtp);
userRouter.put("/:id/passReset");
userRouter.post("/leaders/add", protect, role("umuturage"), createALeader);

module.exports = userRouter;
