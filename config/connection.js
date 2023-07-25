const mysql = require("mysql2");

// connecting to db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "root123?",
    database: "employee_tracker_db",
  },
  console.log("Successfully connected to employee tracker database")
);

module.exports = db;
