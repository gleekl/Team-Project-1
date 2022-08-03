require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;

const tripController = require("./controllers/tripController");
const eventController = require("./controllers/eventController");

app.use(express.json());

app.use("/trips", tripController);
app.use("/events", eventController);

// INITIALISATION
mongoose.connect(dbURL, () => {
  console.log("Connected on Trips db");
});

app.listen(PORT, (req, res) => {
  console.log("connected to PORT", PORT);
});
