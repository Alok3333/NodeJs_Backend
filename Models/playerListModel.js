const mongoose = require("mongoose");

// Create Schema
const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
});

// Model of playerSchema
const PlayerModel = mongoose.model("playerlists", playerSchema);

module.exports = PlayerModel;