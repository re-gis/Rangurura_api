"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderRouter = void 0;
// const express = require("express");
// const leaderRouter = express.Router();
// const leaderController=require('../../controllers/leaders/leaders.controller');
// const displayLeaders=require("../../controllers/leaders/displayLeader.controller");
const express_1 = __importDefault(require("express"));
exports.leaderRouter = express_1.default.Router();
//
// /**
//  * @swagger
//  * /api/v1/leaders/leaders:
//  *   get:
//  *     summary: get leaders.
//  *     description: This is to get the list of all leaders.
//  *     tags: [Leaders]
//  *     parameters:
//  *       - in: body
//  *         name: get leaders
//  *         description: To get the list of all leaders.
//  *         required: true
//  *         schema:
//  *           type: object
//  *     responses:
//  *       200:
//  *         description: leader added successfully.
//  *       400:
//  *         description: Unauthorized - Invalid credentials.
//  *       500:
//  *         description: Internal server error.
//  */
// leaderRouter.get('/leaders',displayLeaders);
//
//
// /**
//  * @swagger
//  * /api/v1/leaders/addLeaders:
//  *   post:
//  *     summary: Register a new user
//  *     description: Register a new user to the Rangurura system.
//  *     tags:
//  *       - Leaders
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             required:
//  *               - indangamuntu
//  *               - organizationLevel
//  *               - location
//  *               - category
//  *               - role
//  *             properties:
//  *               indangamuntu:
//  *                 type: string
//  *               organizationLevel:
//  *                 type: string
//  *               location:
//  *                 type: string
//  *               category:
//  *                 type: string
//  *               role:
//  *                 type: string
//  *     responses:
//  *       200:
//  *         description: Successful registration
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *       400:
//  *         description: Bad request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                 error:
//  *                   type: string
//  *       500:
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 error:
//  *                   type: string
//  */
const auth_user_1 = require("../../middlewares/auth.user");
const leaders_controller_1 = require("../../controllers/leaders/leaders.controller");
exports.leaderRouter.post('/add', auth_user_1.protect, (0, auth_user_1.role)("UMUTURAGE"), leaders_controller_1.createALeader);
//
// module.exports = leaderRouter;
