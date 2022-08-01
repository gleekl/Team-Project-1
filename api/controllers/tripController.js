const express = require('express')

const tripsRouter = express.Router()
const Trip = require('../models/tripModel')

// INDEX route
tripsRouter.get('/', async (req, res) => {
  const trips = await Trip.find({}).exec()
  console.log(trips);

  res.status(200).json(trips)
})

// SHOW route
tripsRouter.get('/:tripID', async (req, res) => {
  const trip = await Trip.findById(req.params.holidayID).exec()
  res.status(200).json(trip)
})

// 




module.exports = tripsRouter