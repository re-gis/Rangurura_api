"use strict";
//
// const path = require("path");
// const {pool} = require(path.join(__dirname, "../../config/mysql"));
//
//
// const displayLeaders = async (req, res) => {
//   try {
//     const sql = "SELECT * FROM Leaders";
//
//     // Use the mysqlConnection object to query the database
//    pool.query(sql, (error, results, fields) => {
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
// // Export the displayLeaders function for use in your application
// module.exports = displayLeaders;
