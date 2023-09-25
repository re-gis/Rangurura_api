const express = require("express");
const leaderRouter = express.Router();
const leaderController=require('../../controllers/leaders/leaders.controller')
//this is to store idea your Ideas
leaderRouter.post('/addLeader',leaderController);
module.exports = leaderRouter;
