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

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints related to user management.
 */

/**
 * @swagger
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user.
 *     description: Register a new user with the provided details.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user object to be registered.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             amazina:
 *             required:true
 *             role:
 *             required:true
 *             intara:
 *             required:true
 *             akarere: 
 *             required:true
 *             umurenge: 
 *             required:true
 *             akagari:
 *             required:true
 *             umudugudu: 
 *             required:true
 *             telephone: 
 *             required:true
 *             indangamuntu:
 *             required:true
 *             ijambobanga: 
 *             required:true
 *             imageUrl:
 *             required:true
 *             
 *             verified: 
 *             required:true
 * 
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */

userRouter.post("/register", registerUser);


/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: User login.
 *     description: Log in an existing user with the provided credentials.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user's login credentials.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            indangamuntu:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/login", loginUser);



/**
 * @swagger
 * /api/v1/users/verify:
 *   post:
 *     summary: User verification.
 *     description: this is to verify the user with otp.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: credentials
 *         description: The user's login credentials.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            otp:
 *               type: string
 *               required
 *            number:
 *               type: string
 *     responses:
 *       200:
 *         description: User verified successfully.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/verify", verifyOtp);

/**
 * @swagger
 * /api/v1/users/resendOtp:
 *   post:
 *     summary: User reverify.
 *     description: this is to resent verification otp to the user.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: verification otp
 *         description: The user's verification otp.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            number:
 *               type: string
 *           
 *     responses:
 *       200:
 *         description: verification opt sent  successfully.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */
userRouter.post("/resendOtp", resendOtp);

/**
 * @swagger
 * /api/v1/users/:id/passReset:
 *   post:
 *     summary: Reset password.
 *     description: This is to reset password.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: verification otp
 *         description: This is to reset the password of the user if he or she forget the password.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *            number:
 *               type: string
 *           
 *     responses:
 *       200:
 *         description: password reset  successfully.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

userRouter.put("/:id/passReset");

/**
 * @swagger
 * /api/v1/users/leaders/add:
 *   post:
 *     summary: Add leader.
 *     description: This is to grant or to add permission to the leader.
 *     tags: [Users]
 *     parameters:
 *       - in: body
 *         name: verification otp
 *         description: The user's verification otp.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *          indangamuntu:
 *          required:true
 *          organizationLevel: 
 *          required:true
 *          location: 
 *          required:true
 *          category:
 *           required:true
 *          role: 
 *          required:true
 *           
 *     responses:
 *       200:
 *         description: leader added successfully.
 *       401:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

userRouter.post("/leaders/add", protect, role("umuturage"), createALeader);


module.exports = userRouter;







