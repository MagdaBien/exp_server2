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
  db.testimonials.forEach((ob) => {
    if (ob.id == req.params.id) {
      return res.json(ob);
    } else {
      return res.send("There is no such id element");
    }
  });
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
  db.testimonials.forEach((ob) => {
    const id = req.params.id;
    if (ob.id == id) {
      const { author, text } = req.body;
      ob = { id, author, text };
      return res.send("changed");
    }
  });
  return res.send("There is no such id element");
});

router.route("/testimonials/:id").delete((req, res) => {
  const testimonials_start = db.testimonials.length;
  db.testimonials.filter((item) => item.id != req.params.id);
  if (db.testimonials.length < testimonials_start) {
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
