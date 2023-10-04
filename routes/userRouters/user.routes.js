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
 * /api/v1/users/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user to the Rangurura system.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amazina
 *               - intara
 *               - akarere
 *               - akagari
 *               - umudugudu
 *               - telephone
 *               - ijambobanga
 *               - indangamuntu
 *               - kwemezaIjambobanga
 *               - umurenge
 *             properties:
 *               amazina:
 *                 type: string
 *               intara:
 *                 type: string
 *               akarere:
 *                 type: string
 *               umurenge:
 *                 type: string
 *               akagari:
 *                 type: string
 *               umudugudu:
 *                 type: string
 *               telephone:
 *                 type: string
 *               ijambobanga:
 *                 type: string
 *                 description: Password in Kinyarwanda
 *               indangamuntu:
 *                 type: string
 *               kwemezaIjambobanga:
 *                 type: string
 *                 description: Password confirmation in Kinyarwanda
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful registration
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 *               required:true
 *             password:
 *               type: string
 *               required:true
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
 *               required:true
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
 *               required:true
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
 *              indangamuntu:
 *               type: string
 *                required:true
 *              organizationLevel: 
 *                 required:true
 *                 type: string
 *              location: 
 *                 required:true
 *                 type: string
 * 
 *              category:
 *                  required:true
 *                  type: string
 * 
 *               role: 
 *                 required:true
 *                 type: string
 * 
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







