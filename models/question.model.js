const mongoose = require("mongoose");
const QuestionSchema = new mongoose.Schema({
  amazina: {
    type: String,
    required: true,
    minLength: 3,
  },
  intara: {
    type: String,
    required: true,
    minLength: 3,
  },
  akarere: {
    type: String,
    required: true,
  },
  umurenge: {
    type: String,
    required: true,
  },
  akagari: {
    type: String,
    required: true,
  },
  umudugudu: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
  indangamuntu: {
    type: String,
    required: true,
  },

  category: {
    type: String,
    required: true,
  },
  urwego: {
    type: String,
    required: true,
  },
  ikibazo: {
    type: String,
    required: true,
  },
  proof: {
    type: String,
    required: false,
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports.Question = mongoose.model("Question", QuestionSchema);
