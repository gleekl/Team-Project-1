require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
const PORT = process.env.PORT;
const dbURL = process.env.MONGODB_URL

const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:4000",
  "http://localhost:4001"
]

const tripController = require('./controllers/tripController')
const eventController = require('./controllers/eventController')

app.use(express.json())

// // URL to allow
// app.use(cors({
//   origin: (origin, cb) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       cb(null, true)
//     } else {
//       cb(new Error())
//     }
//   }
// }))

app.use('/trips', tripController)
app.use('/event', eventController)

// INITIALISATION
mongoose.connect(dbURL, () => {
  console.log('Connected on Trips db');
})

app.listen(PORT, (req, res) => {
  console.log("connected to PORT", PORT);
});
