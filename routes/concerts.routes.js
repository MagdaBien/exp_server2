const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// concerts

router.route("/concerts/:id").get((req, res) => {
  const selectedConcert = db.concerts.find(
    (concert) => concert.id == req.params.id
  );
  if (selectedConcert) {
    res.json(selectedConcert);
  } else {
    res.send("There is no such id element");
  }
});

router.route("/concerts").get((req, res) => {
  res.json(db.concerts);
});

router.route("/concerts").post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  db.concerts.push({ id, performer, genre, price, day, image });
  res.send("added");
});

router.route("/concerts/:id").put((req, res) => {
  const id = req.params.id;
  const concertIndex = db.concerts.findIndex((concert) => concert.id == id);
  if (concertIndex) {
    const { performer, genre, price, day, image } = req.body;
    db.concerts[concertIndex] = { id, performer, genre, price, day, image };
    res.send("changed");
  } else {
    res.send("There is no such id element");
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const concertIndex = db.concerts.findIndex(
    (concert) => concert.id == req.params.id
  );
  if (concertIndex) {
    db.concerts.splice(concertIndex, 1);
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
