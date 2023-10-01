const express = require("express");
const ideasRouter = express.Router();
const IdeaController=require('../../controllers/ideas/idea.controller')

//this is to store idea in db

/**
 * @swagger
 * tags:
 *   name: Ideas
 *   description: API endpoints related to Idea management.
 */

/**
 * @swagger
 * /api/v1/ideas:
 *   post:
 *     summary: send a new idea.
 *     description: send a new idea with the provided details.
 *     tags: [Ideas]
 *     parameters:
 *       - in: body
 *         name: ideas
 *         description: The idea object to be sent.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *          indangamuntu:
 *             required:true
 *          category:
 *             required:true
 * 
 *          igitekerezo,
 *             required:true
 * 
 *          urwego:
 *             required:true
 * 
 * 
 *     responses:
 *       200:
 *         description: Idea sent successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */


ideasRouter.post('/ideas',IdeaController);


module.exports = ideasRouter;
