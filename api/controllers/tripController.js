const express = require("express");

const tripsRouter = express.Router();
const Trip = require("../models/tripModel");

// INDEX route
tripsRouter.get("/", async (req, res) => {
  const trips = await Trip.find({}).exec();
  console.log(trips);

  res.status(200).json(trips);
});

// SHOW route
tripsRouter.get("/:tripID", async (req, res) => {
  const trip = await Trip.findById(req.params.tripID).exec();
  res.status(200).json(trip);
});

// CREATE NEW ROUTE - POST
tripsRouter.post("/", async (req, res) => {
  try {
    const newTrip = await Trip.create(req.body);
    console.log(newTrip);
    res.status(200).json(newTrip);
  } catch (error) {
    res.status(500).json({ errorMessage: error.Message });
    console.log(error.message);
    console.log("something went wrong in creating new trip");
  }
});

// UPDATE ROUTE - PUT
tripsRouter.put("/:tripID", async (req, res) => {
  try {
    const updatedTrip = await Trip.findByIdAndUpdate(
      req.params.tripID,
      req.body,
      { new: true }
    ).exec();
    console.log(update);
    res.status(200).json(updatedTrip);
  } catch (error) {
    res.status(500).json({ errorMessage: error.Message });
    console.log(error.message);
    console.log(
      "something went wrong in updating this trip",
      req.params.tripID
    );
  }
});

// DELETE ROUTE - DELETE
tripsRouter.delete("/:tripID", async (req, res) => {
  const deletedTrip = await Trip.findByIdAndDelete(req.params.tripID).exec();
  res.status(200).json(deletedTrip);
});

module.exports = tripsRouter;
