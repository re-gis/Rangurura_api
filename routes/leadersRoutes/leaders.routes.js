const express = require("express");
const leaderRouter = express.Router();
const leaderController=require('../../controllers/leaders/leaders.controller');
const displayLeaders=require("../../controllers/leaders/displayLeader.controller");
//this is to store idea your Ideas
leaderRouter.post('/addLeader',leaderController);
//this is  to get the list of  all leaders
leaderRouter.get('/leaders',displayLeaders);
module.exports = leaderRouter;
