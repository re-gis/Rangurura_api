"use strict";
//
// const path = require("path");
// const {pool} = require(path.join(__dirname, "../../config/mysql"));
//
// //this is for displaying all events
// const displayAllEvents = async (req, res) => {
//
//   try {
//     const sql = "SELECT * FROM Events";
//
//     // Use the mysqlConnection object to query the database
//    pool.query(sql, (error, results, fields)=>{
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
// //this is the event posted by the given leaders
// const displayLeadersEvents = async (req, res) => {
//   const {indangamuntu,location}=req.body;
//    try {
//      const sql = `SELECT * FROM Events  WHERE indangamuntu=${indangamuntu} && location=${location}`;
//
//      // Use the mysqlConnection object to query the database
//     pool.query(sql, (error, results, fields)=>{
//        if (error) {
//          console.error("Error executing SQL query:", error);
//          return res.status(500).json({ error: "Internal Server Error" });
//        }
//
//        // Send the query results as a JSON response
//        res.status(200).json(results);
//      });
//    } catch (err) {
//      console.error("Error:", err);
//      res.status(500).json({ error: "something went wrong please try again later." });
//    }
//  };
//
// // Export the displayLeaders function for use in your application
// module.exports = {displayAllEvents,displayLeadersEvents};
