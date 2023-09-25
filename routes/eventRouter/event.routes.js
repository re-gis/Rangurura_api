const express = require("express");
const eventRouter = express.Router();
const eventController=require('../../controllers/events/event.controller'); 

eventRouter.post('/sendevents',eventController); //this is the logic to send the event
module.exports = eventRouter;