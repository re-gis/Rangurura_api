"use strict";
// //this is the logic about the message
// const MessageSchema = require("../../entities/messages.models");
// const path = require("path");
// const { pool } = require(path.join(__dirname, "../../config/mysql"));
//
// //this is to create the new messag
// const messageController = async (req, res) => {
//   //this is to get the input from the user
//   const { senderId, receiverId, message } = req.body;
//   if (!senderId || !receiverId || !message) {
//     return res
//       .status(400)
//       .json({ message: "Select the receiver and type the message!" });
//   }
//
//   try {
//     const newMessage = await new MessageSchema({
//       senderId,
//       receiverId,
//       message,
//     });
//
//     //this is to save the problem to the db
//     await newMessage.save();
//     return res.status(200).json({ msg: "Mwohereje message!" });
//   } catch (error) {
//     res
//       .status(500)
//       .json({ msg: "something went wrong please try again later" });
//     console.log(error);
//   }
// };
//
// //this is to  get the messages
// const displayMessages = async (req, res) => {
//   try {
//     const { loggedUserId } = req.body;
//     const sql = `SELECT * FROM Messages WHERE receiverId=${loggedUserId}`;
//
//     // Use the mysqlConnection object to query the database
//     pool.query(sql, (error, results, fields) => {
//       if (error) {
//         console.error("Error executing SQL query:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }
//
//       // Send the query results as a JSON response
//       res.status(200).json(results);
//     });
//   } catch (err) {
//     console.error("Error:", err);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
//
// //this is to export the eventcontroller
// module.exports = { messageController, displayMessages };
