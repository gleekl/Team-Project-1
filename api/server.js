require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')


const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// INITIALISATION

mongoose.connect(dbURL, () => {
  console.log('Connected on Trips db');
})

app.listen(PORT, (req, res) => {
  console.log("connected to PORT", PORT);
});
