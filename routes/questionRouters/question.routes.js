const express = require("express");
const {
  createQuestion,
  getYourQns,
  getPeoplesQns,
} = require("../../controllers/questions/question.controller");
const { protect, role } = require("../../middlewares/auth.user");
const questionRouter = express.Router();

//these are routes to be  used in access of the questions
questionRouter.post("/create", protect, createQuestion);
questionRouter.get("/my-qns", protect, getYourQns);
questionRouter.get("/all-questions", protect, role("umuturage"), getPeoplesQns);

module.exports = questionRouter;
