const express = require('express')

const eventRouter = express.Router()
const Event = require('../models/eventModel')

// INDEX route
eventRouter.get('/', async (req, res) => {
  const event = await Event.find({}).exec()
  console.log(event);

  res.status(200).json(event)
})

// SHOW route
eventRouter.get('/:eventID', async (req, res) => {
  const event = await Event.findById(req.params.eventID).exec()
  res.status(200).json(event)
})



module.exports = eventRouter