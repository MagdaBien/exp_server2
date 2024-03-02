const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// seats

router.route("/seats/:id").get((req, res) => {
  const db2 = db.seats.filter((item) => item.id == req.params.id);
  if (db2.length > 0) {
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
  const changedDb = [];
  let isChanged = false;
  db.seats.forEach((seat) => {
    if (seat.id == id) {
      const { day, seat, client, email } = req.body;
      seat = { id, day, seat, client, email };
      isChanged = true;
    }
    changedDb.push(seat);
  });
  db.seats = changedDb;
  isChanged ? res.send("changed") : res.send("There is no such id element");
});

router.route("/seats/:id").delete((req, res) => {
  const seats_start = db.seats.length;
  db.seats = db.seats.filter((item) => item.id != req.params.id);
  if (db.seats.length < seats_start) {
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
