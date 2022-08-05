const express = require("express");

const tripsRouter = express.Router();
const Trip = require("../models/tripModel");

const upload = require("../middlewares/upload");

// INDEX route
tripsRouter.get("/", async (req, res) => {
  const trips = await Trip.find({}).populate("events").exec();
  res.status(200).json(trips);
});

// SHOW route
tripsRouter.get("/:tripID", async (req, res) => {
  const trip = await Trip.findById(req.params.tripID).exec();
  res.status(200).json(trip);
});

// CREATE NEW ROUTE - POST
tripsRouter.post("/", upload.single("image"), async (req, res) => {
  // AIM: Guarding undefined req.file.path
  // set the image to default
  let image =
    "https://res.cloudinary.com/dgb2gz29u/image/upload/v1657851570/empty-image_urwddn.jpg";
  // if req.file exist (users upload their own picture when creating trips)
  if (req.file && req.file.path) {
    // set image to req.file.path
    image = req.file.path;
  }
  try {
    // set the field and create it in MongoDB
    const field = { ...req.body, image: image };
    const newTrip = await Trip.create(field);
    res.status(200).json(newTrip);
  } catch (error) {
    // if error occurs, send back error message
    res.status(500).json({ errorMessage: error.Message });
    console.log(error.message);
    console.log("something went wrong in creating new trip");
  }
});

// UPDATE ROUTE - PUT
tripsRouter.put("/:tripID", upload.single("image"), async (req, res) => {
  // AIM: Guarding "events" field when editing trip with no event
  // BUG: if no events nested in a trip, Node.js is treating event as a string (''), which creates a CastError with Mongoose Schema.
  // SOLUTION: delete events field, let the update add a new event field
  // POTENTIAL CONCERNS: what if we edit a trip with events? Will this delete previous event?
  if (req.file && req.file.path) {
    image = req.file.path;
  }
  delete req.body.events;
  try {
    const field = { ...req.body, image: image };
    const updatedTrip = await Trip.findByIdAndUpdate(req.params.tripID, field, {
      new: true,
    }).exec();
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
