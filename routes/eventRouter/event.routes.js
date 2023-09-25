const express = require("express");
const eventRouter = express.Router();
const eventController=require('../../controllers/events/event.controller'); 
const displayAllEvents=require('../../controllers/events/displayEvents.controller').displayAllEvents;
const displayLeaderEvents=require('../../controllers/events/displayEvents.controller').displayLeadersEvents;

eventRouter.post('/sendevents',eventController); //this is the route to send the event

eventRouter.get('/allevents',displayAllEvents); //this is the route to get the event
eventRouter.post('/leaderEvent',displayAllEvents); //this is the route to get the event of the given leader
module.exports = eventRouter;