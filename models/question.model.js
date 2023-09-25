require("dotenv").config();
const mongoose = require("mongoose");
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

const QuestionSchema = sequelize.define("Problems", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  ikibazo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  proof: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  urwego: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  indangamuntu: {
    type: DataTypes.STRING, //this is to be gotten after login of the user
    allowNull: false,
  },
  cloudinaryId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Sync the model with the database to create the table
sequelize
  .sync()
  .then(() => {
    console.log("Table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = QuestionSchema;
