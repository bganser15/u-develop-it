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
//shows candidate table
app.get("/api/candidates", (req, res) => {
  const sql = `SELECT * FROM candidates`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    }
    res.json({
      message: "success",
      data: rows,
    });
    console.log(rows);
  });
});

//get a single candidate
// Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  //params go where the question marks are
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Create a candidate
//const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
//VALUES (?,?,?,?)`;
//const params = [1, "Ronald", "Firbank", 1];

//db.query(sql, params, (err, result) => {
//if (err) {
//console.log(err);
//}
//console.log(result);
//});

// GET a single candidate
//db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
//if (err) {
//console.log(err);
//}
//console.log(row);
//});

// Delete a candidate
//db.query(`DELETE FROM candidates WHERE id = ?`, 1, (err, result) => {
//if (err) {
//console.log(err);
//}
//console.log(result);
//});
//default response for any other request that is not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});
