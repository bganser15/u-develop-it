const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//posts hello world in localhost:3001
app.get("/", (req, res) => {
  res.json({
    message: "Hello World :)",
  });
});

//default response for any other request that is not found
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log("Server running on port ${PORT}");
});
