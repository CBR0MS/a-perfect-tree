const express = require("express");
const router = express.Router();

const Snippet = require("../models/snippet");
const Game = require("../models/game");

// Snippet model
router.get("/snippets/:id", (req, res, next) => {
  if (req.params.id) {
    Snippet.find({ id: req.params.id })
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Invalid snippet id"
    });
  }
});

router.get("/snippets", (req, res, next) => {
  Snippet.find({})
    .then(data => res.json(data))
    .catch(next);
});

router.post("/snippets", (req, res, next) => {
  if (req.body.text) {
    Snippet.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The text field is empty"
    });
  }
});

router.patch("/snippets/:id", (req, res, next) => {
  if (req.body.id) {
    Snippet.findOneAndUpdate({ id: req.params.id }, req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The input field is empty"
    });
  }
});

router.delete("/snippets/:id", (req, res, next) => {
  Snippet.findOneAndDelete({ id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

// Game model
router.get("/games/:id", (req, res, next) => {
  if (req.params.id) {
    Game.find({ id: req.params.id })
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "Invalid game id"
    });
  }
});

router.get("/games", (req, res, next) => {
  Game.find({})
    .then(data => res.json(data))
    .catch(next);
});

router.post("/games", (req, res, next) => {
  if (req.body.name) {
    Game.create(req.body)
      .then(data => res.json(data))
      .catch(next);
  } else {
    res.json({
      error: "The name field is empty"
    });
  }
});

router.delete("/games/:id", (req, res, next) => {
  Game.findOneAndDelete({ id: req.params.id })
    .then(data => res.json(data))
    .catch(next);
});

module.exports = router;
