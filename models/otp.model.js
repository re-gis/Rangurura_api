require("dotenv").config();
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

const Otp = sequelize.define("Otp", {
  otp: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize
  .sync()
  .then(() => {
    console.log("Table created successfully.");
  })
  .catch((err) => {
    console.error("Error creating table:", err);
  });

module.exports = Otp;
