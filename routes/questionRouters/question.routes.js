const express = require('express')
const QuestionController=require("../../controllers/questions/question.controller");
const questionRouter = express.Router()


// //these are routes to be  used in access of the questions
questionRouter.post('/problem',QuestionController);

module.exports = questionRouter