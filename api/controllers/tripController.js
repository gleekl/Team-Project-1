const express = require('express')

const tripsRouter = express.Router()
const Trip = require('../models/tripModel')

tripsRouter.get('/', async (req, res) => {
  const trips = await Trip.find({}).exec()
  console.log(trips);

  res.status(200).json(trips)
})

module.exports = tripsRouter