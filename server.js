const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();
const mysql = require("mysql2");

require("dotenv").config();
const password = process.env.MYPASSWORD;
//console.log(process.env); // remove this after you've confirmed it working

//middleware
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

//posts hello world in localhost:3001
app.get("/", (req, res) => {
  res.json({
    message: "Hello World :)",
  });
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});
//default response for any other request that is not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});
