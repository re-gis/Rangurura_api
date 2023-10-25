"use strict";
// const express = require("express");
// const leaderRouter = express.Router();
// const leaderController=require('../../controllers/leaders/leaders.controller');
// const displayLeaders=require("../../controllers/leaders/displayLeader.controller");
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
// leaderRouter.post('/addLeader',leaderController);
//
// module.exports = leaderRouter;
