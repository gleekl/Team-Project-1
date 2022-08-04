const express = require("express");

const eventRouter = express.Router();

const Trip = require("../models/tripModel")
const Event = require("../models/eventModel");

const upload = require("../middlewares/upload");

// INDEX route
eventRouter.get("/", async (req, res) => {
  const event = await Event.find({}).exec();
  res.status(200).json(event);
});

// SHOW route
eventRouter.get("/:eventID", async (req, res) => {
  const event = await Event.findById(req.params.eventID)
    .populate("events")
    .exec();
  res.status(200).json(event);
});

// CREATE route
eventRouter.post("/:tripID", upload.single("image"), async (req, res) => {
  try {
    // add image to req.body
    // image: req.file
    const field = { ...req.body, image: req.file.path };
    const newEvent = await Event.create(field);
    const trip = await Trip.findById(req.params.tripID).exec()
    console.log(trip);
    trip.events.push(newEvent)
    const updatedTrip = await trip.save()
    await updatedTrip.populate('events')
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ errorMessage: error.Message });
    console.log(error.message);
    console.log("Error creating new Event.");
  }
});

// UPDATE route
eventRouter.put("/:eventID", upload.single("image"), async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.eventID,
      req.body,
      { new: true }
    ).exec();
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ errorMessage: error.Message });
    console.log(error.message);
    console.log("Error updating Event.", req.params.eventID);
  }
});

// DELETE Route
eventRouter.delete("/:eventID", async (req, res) => {
  const deleteEvent = await Event.findByIdAndRemove(req.params.eventID).exec();
  res.status(200).json(deleteEvent);
});

module.exports = eventRouter;
