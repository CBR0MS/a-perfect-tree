const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SnippetSchema = new Schema({
  text: String,
  id: String,
  interps: [{ user: String, selection: Object }]
});

const Snippet = mongoose.model("snippet", SnippetSchema);

module.exports = Snippet;
