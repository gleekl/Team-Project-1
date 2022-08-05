const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    trips: [{ type: Schema.Types.ObjectId, ref: "Trip" }]
  },
)

const User = mongoose.model('User', userSchema)

module.exports = User