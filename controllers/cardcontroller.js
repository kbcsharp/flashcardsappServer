var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var Card = sequelize.import("../models/card");

// create new flashcard for user
router.post("/create", function(req, res) {
  if (!req.errors) {
    const cardFromRequest = {
      question: req.body.card.question,
      answer: req.body.card.answer,
      category: req.body.card.category,
      owner: req.user.id
    };
    Card.create(cardFromRequest)
      .then(card => res.status(200).json(card))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// get all flashcards for user
router.get("/getall", (req, res) => {
  Card.findAll({
    where: {
      owner: req.user.id
    }
  })
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json({ error: err }));
});

// get random flashcard from certain category for user
router.get("/:category/random", (req, res) => {
  Card.findAll({
    order: [[sequelize.fn("RANDOM")]],
    where: {
      category: req.params.category,
      owner: req.user.id
    },
    limit: 1
  })
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json({ error: err }));
});

//get all flashcards from category for user
router.get("/:category/all", (req, res) => {
  Card.findAll({
    where: {
      category: req.params.category,
      owner: req.user.id
    },
    limit: 1
  })
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json({ error: err }));
});

// get random flashcard from all categories for user
router.get("/random", (req, res) => {
  Card.findAll({
    order: [[sequelize.fn("RANDOM")]],
    where: {
      owner: req.user.id
    }
  })
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json({ error: err }));
});

// edit flashcard for user
router.put("/:id/update", (req, res) => {
  if (!req.errors) {
    Card.update(req.body.card, { where: { id: req.params.id } })
      .then(card => res.status(200).json(card))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// delete flashcard for user
router.delete("/:id/delete", (req, res) => {
  Card.destroy({ where: { id: req.params.id } })
    .then(card => res.status(200).json(card))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
