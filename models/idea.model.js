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

//this is the table to store ideas for building country.
const IdeaSchema = sequelize.define("Ideas", {
  indangamuntu: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  igitekerezo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urwego: {
    type: DataTypes.STRING,
    allowNull: false,
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

module.exports = IdeaSchema;
