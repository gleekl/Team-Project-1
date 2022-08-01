require('dotenv').config()
const mongoose = require('mongoose')

const Trip = require('../models/tripModel')
const Event = require('../models/eventModel')

const dbURL = process.env.MONGODB_URL

const eventData = require('./eventData.json')
const tripsData = require('./tripsData.json')

mongoose.connect(dbURL, async () => {
//   const trip = await Trip.find({}).populate('events')
//   console.log(trip[3].events)
  await Trip.collection.deleteMany()
  await Event.collection.deleteMany()

  const events = await Event.insertMany(eventData)

  const randomTrip = () => {
    return tripsData[Math.floor(Math.random() * tripsData.length)]
  }

  events.forEach((event) => {
    const trip = randomTrip()
    trip.events = trip.events || []
    trip.events.push(event)
  })

  const trips = await Trip.insertMany(tripsData)
  console.log(trips)

  mongoose.connection.close()
})