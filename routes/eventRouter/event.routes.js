const express = require("express");
const eventRouter = express.Router();
const eventController=require('../../controllers/events/event.controller'); 
const displayAllEvents=require('../../controllers/events/displayEvents.controller').displayAllEvents;
const displayLeaderEvents=require('../../controllers/events/displayEvents.controller').displayLeadersEvents;

/**
 * @swagger
 * tags:
 *   name:Events
 *   description: API endpoints related to events management.
 */

/**
 * @swagger
 * /api/v1/events/sendevents:
 *   post:
 *     summary:Post a new event.
 *     description: Post a new user with the provided details.
 *     tags: [Events]
 *     parameters:
 *       - in: body
 *         name: events
 *         description: This is to send or post the new events.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *           eventName:
 *               required:true
 *           organizationLevel:
 *              required:true
 * 
 *           location:
 *              required:true
 * 
 *           category:
 *              required:true
 * 
 *           startDate:
 *              required:true
 * 
 *           endDate:
 *              required:true
 * 
 *          endTime:
 *              required:true
 * 
 *           startTime:
 *               required:true
 * 
 *           description:
 *              required:true
 * 
 *           indangamuntu:
 *              required:true
 * 
 * 
 *     responses:
 *       200:
 *         description: User registered successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */

eventRouter.post('/sendevents',eventController); //this is the route to send the event


/**
 * @swagger
 * /api/v1/events/allevents:
 *   get:
 *     summary:get all events.
 *     description: get all posted events.
 *     tags: [Events]
 *     parameters:
 *       - in: body
 *         name: events
 *         description: This is to get all events.
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *         
 *     responses:
 *       200:
 *         description: events gotten successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
eventRouter.get('/allevents',displayAllEvents); //this is the route to get the event

/**
 * @swagger
 * /api/v1/events/leaderEvent:
 *   post:
 *     summary:get the events posted by specific leader.
 *     description: get the events posted by the identified leader.
 *     tags: [Events]
 *     parameters:
 *       - in: body
 *         name: events
 *         description: This is to get the events posted by the leader
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *           
 *         indangamuntu:
 *         required:true
 *         location
 *         required:true
 * 
 * 
 *     responses:
 *       200:
 *         description:  the events listed  successfully.
 *       400:
 *         description: Bad request - Invalid input.
 *       500:
 *         description: Internal server error.
 */
eventRouter.post('/leaderEvent',displayLeaderEvents); //this is the route to get the event of the given leader

module.exports = eventRouter;

