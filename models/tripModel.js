const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const tripSchema = new Schema(
  {
    author: { type: String, required: true }, // stretch goal
    title: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
    totalCost: Number,
    description: String,
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dgb2gz29u/image/upload/v1657851570/empty-image_urwddn.jpg",
    }, // how to upload multiple image?
  },
  { timestamps: true }
);

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
