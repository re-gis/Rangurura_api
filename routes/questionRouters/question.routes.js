const express = require("express");
const {
  createQuestion,
  getYourQns,
} = require("../../controllers/questions/question.controller");
const protect = require("../../middlewares/auth.user");
const questionRouter = express.Router();

//these are routes to be  used in access of the questions
questionRouter.post("/create", protect, createQuestion);
questionRouter.get("/my-qns", protect, getYourQns);

module.exports = questionRouter;
