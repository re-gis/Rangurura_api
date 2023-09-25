const express = require("express");
const {
  createQuestion,
} = require("../../controllers/questions/question.controller");
const protect = require("../../middlewares/auth.user");
const questionRouter = express.Router();

//these are routes to be  used in access of the questions
questionRouter.post("/create", protect, createQuestion);

module.exports = questionRouter;
