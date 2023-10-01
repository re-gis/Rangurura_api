const express = require("express");
const leaderRouter = express.Router();
const leaderController=require('../../controllers/leaders/leaders.controller');
const displayLeaders=require("../../controllers/leaders/displayLeader.controller");


/**
 * @swagger
 * /api/v1/leaders/addLeader:
 *   post:
 *     summary: Add leader.
 *     description: This is to grant or to add permission to the leader.
 *     tags: [Leaders]
 *     parameters:
 *       - in: body
 *         name: add leader
 *         description: This is to add leader to give responsibility to the person.
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
 *       400:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

leaderRouter.post('/addLeader',leaderController);


/**
 * @swagger
 * /api/v1/leaders/leaders:
 *   get:
 *     summary: get leaders.
 *     description: This is to get the list of all leaders.
 *     tags: [Leaders]
 *     parameters:
 *       - in: body
 *         name: get leaders
 *         description: To get the list of all leaders.
 *         required: true
 *         schema:
 *           type: object        
 *     responses:
 *       200:
 *         description: leader added successfully.
 *       400:
 *         description: Unauthorized - Invalid credentials.
 *       500:
 *         description: Internal server error.
 */

leaderRouter.get('/leaders',displayLeaders);

module.exports = leaderRouter;
