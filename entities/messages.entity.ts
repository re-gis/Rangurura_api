// require("dotenv").config();
// const { Sequelize, DataTypes } = require("sequelize");
//
// const sequelize = new Sequelize(
//   process.env.DATABASE,
//   process.env.USER,
//   process.env.PASSWORD,
//   {
//     host: process.env.HOST,
//     dialect: "mysql",
//   }
// );
// //this is the table to store ideas for building country.
// const MessageSchema = sequelize.define("Messages", {
//   senderId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   receiverId: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//
//   message: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   }
// });
//
// // Sync the model with the database to create the table
// sequelize
//   .sync()
//   .then(() => {
//     console.log("Table created successfully.");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });
//
// module.exports = MessageSchema;
