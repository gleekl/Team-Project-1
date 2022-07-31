const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// INITIALISATION
app.listen(PORT, (req, res) => {
  console.log("connected to PORT", PORT);
});
