const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// testimonials

router.route("/testimonials/random").get((req, res) => {
  const randomIndex = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndex]);
});

router.route("/testimonials/:id").get((req, res) => {
  const db2 = db.testimonials.filter((item) => item.id == req.params.id);
  if (db2.length > 0) {
    res.json(db2);
  } else {
    res.send("There is no such id element");
  }
});

router.route("/testimonials").get((req, res) => {
  res.json(db.testimonials);
});

router.route("/testimonials").post((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  db.testimonials.push({ id, author, text });
  res.send("added");
});

router.route("/testimonials/:id").put((req, res) => {
  const id = req.params.id;
  const changedDb = [];
  let isChanged = false;
  db.testimonials.forEach((testimonial) => {
    if (testimonial.id == id) {
      const { author, text } = req.body;
      testimonial = { id, author, text };
      isChanged = true;
    }
    changedDb.push(testimonial);
  });
  db.testimonials = changedDb;
  isChanged ? res.send("changed") : res.send("There is no such id element");
});

router.route("/testimonials/:id").delete((req, res) => {
  const testimonials_start = db.testimonials.length;
  db.testimonials = db.testimonials.filter((item) => item.id != req.params.id);
  if (db.testimonials.length < testimonials_start) {
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
