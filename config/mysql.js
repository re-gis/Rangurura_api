const mysql = require("mysql");
require("dotenv").config();
// Create a MySQL connection pool
const dbConfig = {
  host: process.env.HOST,
  user: process.env.USERS,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
};

const mysqlConnect = async () => {
  try {
    const pool = mysql.createPool(dbConfig);

    // Test the connection pool
    pool.getConnection((err, connection) => {
      if (err) {
        console.error("Failed to connect to MySQL:", err);
      } else {
        console.log("Connected to MySQL database");

        // Release the connection when done
        connection.release();
      }
    });
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

module.exports = {
  mysqlConnect,
};
