const express = require("express");

const eventRouter = express.Router();
const Event = require("../models/eventModel");

eventRouter.get("/", async (req, res) => {
  const event = await Event.find({}).exec();

  res.status(200).json(event);
});

module.exports = eventRouter;
