const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// seats

router.route("/seats/:id").get((req, res) => {
  const id = req.params.id;
  const found = db.seats.find((element) => element.id == id);
  if (found != undefined) {
    db.seats.forEach((ob) => {
      if (ob.id == req.params.id) return res.json(ob);
    });
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
  const found = db.seats.find((element) => element.id == id);
  if (found != undefined) {
    const { day, seat, client, email } = req.body;
    db.seats = db.seats.map((ob) =>
      ob.id == id ? { id, day, seat, client, email } : ob
    );
    res.send("changed");
  } else {
    res.send("There is no such id element");
  }
});

router.route("/seats/:id").delete((req, res) => {
  const id = req.params.id;
  const found = db.seats.find((element) => element.id == id);
  if (found != undefined) {
    db.seats = db.seats.filter((ob) => ob.id != req.params.id);
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
