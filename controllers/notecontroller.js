var router = require("express").Router();
var sequelize = require("../db");
var User = sequelize.import("../models/user");
var Card = sequelize.import("../models/card");
var Note = sequelize.import("../models/note");

// create new note for user
router.post("/create", function(req, res) {
  if (!req.errors) {
    const noteFromRequest = {
      title: req.body.note.title,
      content: req.body.note.content,
      category: req.body.note.category,
      owner: req.user.id
    };
    Note.create(noteFromRequest)
      .then(note => res.status(200).json(note))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// get all notes for user
router.get("/getall", (req, res) => {
  Note.findAll({
    where: {
      owner: req.user.id
    }
  })
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json({ error: err }));
});

//get all notes from category for user
router.get("/:category/all", (req, res) => {
  Note.findOne({
    where: {
      category: req.params.category,
      owner: req.user.id
    }
  })
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json({ error: err }));
});

// edit note for user
router.put("/:id/update", (req, res) => {
  if (!req.errors) {
    Note.update(req.body.note, { where: { id: req.params.id } })
      .then(note => res.status(200).json(note))
      .catch(err => res.json(req.errors));
  } else {
    res.status(500).json(req.errors);
  }
});

// delete flashcard for user
router.delete("/:id/delete", (req, res) => {
  Note.destroy({ where: { id: req.params.id } })
    .then(note => res.status(200).json(note))
    .catch(err => res.status(500).json({ error: err }));
});

module.exports = router;
