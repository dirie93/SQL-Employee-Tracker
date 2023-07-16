const mysql = require("mysql2");

// connecting to db
const db = mysql.createConnection(
  {
    host: "localhost",
    // SQL Username
    user: "root",
    // SQL Password
    password: "",
    database: "employee_tracker",
  },
  console.log("Successfully connected to employee tracker database")
);

module.exports = db;
