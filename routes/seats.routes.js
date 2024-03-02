const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// seats

router.route("/seats/:id").get((req, res) => {
  db.seats.forEach((ob) => {
    if (ob.id == req.params.id) {
      return res.json(ob);
    } else {
      return res.send("There is no such id element");
    }
  });
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
  db.seats.forEach((ob) => {
    const id = req.params.id;
    if (ob.id == id) {
      const { day, seat, client, email } = req.body;
      ob = { id, day, seat, client, email };
      return res.send("changed");
    }
  });
  return res.send("There is no such id element");
});

router.route("/seats/:id").delete((req, res) => {
  const seats_start = db.seats.length;
  db.seats.filter((item) => item.id != req.params.id);
  if (db.seats.length < seats_start) {
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
