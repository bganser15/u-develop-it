const mysql = require("mysql2");
require("dotenv").config();
const password = process.env.MYPASSWORD;
//connect to sql database
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: password,
    database: "election",
  },
  console.log("Connected to the election database")
);

module.exports = db;
