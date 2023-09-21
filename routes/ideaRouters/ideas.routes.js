const express = require("express");
const ideasRouter = express.Router();
const IdeaController=require('../../controllers/ideas/idea.controller')
//this is to store idea your Ideas
ideasRouter.post('/ideas',IdeaController);
module.exports = ideasRouter;
