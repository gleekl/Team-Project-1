const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const eventSchema = new Schema(
  {
    title: { type: String, required: true },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dgb2gz29u/image/upload/v1657851570/empty-image_urwddn.jpg",
    },
    country: String,
    city: String,
    description: { type: String, required: true },
    cost: Number,
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
