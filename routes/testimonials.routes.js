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
  const selectedTestimonial = db.testimonials.find(
    (testimonial) => testimonial.id == req.params.id
  );
  if (selectedTestimonial) {
    res.json(selectedTestimonial);
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
  const testimonialIndex = db.testimonials.findIndex(
    (testimonial) => testimonial.id == id
  );
  if (testimonialIndex) {
    const { author, text } = req.body;
    db.testimonials[testimonialIndex] = { id, author, text };
    res.send("changed");
  } else {
    res.send("There is no such id element");
  }
});

router.route("/testimonials/:id").delete((req, res) => {
  const testimonialIndex = db.testimonials.findIndex(
    (testimonial) => testimonial.id == req.params.id
  );
  if (testimonialIndex) {
    db.testimonials.splice(testimonialIndex, 1);
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
