require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const session = require('express-session')
const mongoDBSession = require('connect-mongodb-session')

const tripController = require("./controllers/tripController");
const eventController = require("./controllers/eventController");
const userController = require("./controllers/userController")

const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL;
const MongoDBStore = mongoDBSession(session)
const sessionStore = new MongoDBStore({
  uri: dbURL,
  collection: 'sessions'
})

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use("/trips", tripController);
app.use("/events", eventController);
app.use("/users", userController);

// INITIALISATION
mongoose.connect(dbURL, () => {
  console.log("Connected on Trips db");
});

app.listen(PORT, (req, res) => {
  console.log("connected to PORT", PORT);
});
