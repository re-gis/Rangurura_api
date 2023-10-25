"use strict";
// const express = require("express");
// const {
//   createQuestion,
//   getYourQns,
//   getPeoplesQns,
// } = require("../../controllers/questions/question.controller");
// const { protect, role } = require("../../middlewares/auth.user");
// const questionRouter = express.Router();
// /**
//  * @swagger
//  * tags:
//  *   name: Problems
//  *   description: API endpoints related to Problem management.
//  */
//
// /**
//  * @swagger
//  * /api/v1/questions/create:
//  *   post:
//  *     summary: send new question.
//  *     description: Send a new question with the provided details.
//  *     tags: [Problems]
//  *     parameters:
//  *       - in: body
//  *         name: problems
//  *         description: The problem to be sent.
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             category:
//  *               type: string
//  *             ikibazo:
//  *               type: string
//  *             proof:
//  *               type: string
//  *             urwego:
//  *               type: string
//  *             indangamuntu:
//  *               type: string
//  *             cloudinaryId:
//  *               type: string
//  *             status:
//  *               type: string
//  *
//  *     responses:
//  *       200:
//  *         description: problem sent successfully.
//  *       400:
//  *         description: Bad request - Invalid input.
//  *       500:
//  *         description: Internal server error.
//  */
// questionRouter.post("/create", protect, createQuestion);
//
// /**
//  * @swagger
//  * /api/v1/questions/my-qns:
//  *   get:
//  *     summary: get my recent questions.
//  *     description: Get recent problems.
//  *     tags: [Problems]
//  *     parameters:
//  *       - in: body
//  *         name: problems
//  *         description: This is my recent problems.
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             indangamuntu:
//  *               type: string
//  *
//  *     responses:
//  *       200:
//  *         description: problem gotten successfully.
//  *       500:
//  *         description: Internal server error.
//  */
// questionRouter.get("/my-qns", protect, getYourQns);
//
// /**
//  * @swagger
//  * /api/v1/questions/all-questions:
//  *   get:
//  *     summary: get problem.
//  *     description: This is to get problems posted by people according to organization level.
//  *     tags: [Problems]
//  *     parameters:
//  *       - in: body
//  *         name: problems
//  *         description: This is my recent problems.
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *
//  *     responses:
//  *       200:
//  *         description: problem gotten successfully.
//  *       500:
//  *         description: Internal server error.
//  */
// questionRouter.get("/all-questions", protect, role("umuturage"), getPeoplesQns);
//
// module.exports = questionRouter;
