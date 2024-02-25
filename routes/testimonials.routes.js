const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// testimonials

router.route("/testimonials/random").get((req, res) => {
  const los = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[los]);
});

router.route("/testimonials/:id").get((req, res) => {
  const id = req.params.id;
  const found = db.testimonials.find((element) => element.id == id);
  if (found != undefined) {
    db.testimonials.forEach((ob) => {
      if (ob.id == req.params.id) return res.json(ob);
    });
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
  const found = db.testimonials.find((element) => element.id == id);
  if (found != undefined) {
    const { author, text } = req.body;
    db.testimonials = db.testimonials.map((ob) =>
      ob.id == id ? { id, author, text } : ob
    );
    res.send("changed");
  } else {
    res.send("There is no such id element");
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const id = req.params.id;
  const found = db.testimonials.find((element) => element.id == id);
  if (found != undefined) {
    db.testimonials = db.testimonials.filter((ob) => ob.id != req.params.id);
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
