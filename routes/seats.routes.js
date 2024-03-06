const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// seats

router.route("/seats/:id").get((req, res) => {
  const db2 = db.seats.find((seat) => seat.id == req.params.id);
  if (db2) {
    res.json(db2);
  } else {
    res.send("There is no such id element");
  }
});

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const id = uuidv4();
  db.seats.push({ id, day, seat, client, email });
  res.send("added");
});

router.route("/seats/:id").put((req, res) => {
  const id = req.params.id;
  const seatIndex = db.seats.findIndex((seat) => seat.id == id);
  if (seatIndex) {
    const { day, seat, client, email } = req.body;
    db.seats[seatIndex] = { id, day, seat, client, email };
    res.send("changed");
  } else {
    res.send("There is no such id element");
  }
});

router.route("/seats/:id").delete((req, res) => {
  const seatIndex = db.seats.findIndex((seat) => seat.id == req.params.id);
  if (seatIndex) {
    db.seats.splice(seatIndex, 1);
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
