const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: String,
  id: String,
  snippets: [{ id: String }]
});

const Game = mongoose.model("game", GameSchema);

module.exports = Game;
