const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// concerts

router.route("/concerts/:id").get((req, res) => {
  const db2 = db.concerts.filter((item) => item.id == req.params.id);
  if (db2.length > 0) {
    res.json(db2);
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
  const changedDb = [];
  let isChanged = false;
  db.concerts.forEach((concert) => {
    if (concert.id == id) {
      const { performer, genre, price, day, image } = req.body;
      concert = { id, performer, genre, price, day, image };
      isChanged = true;
    }
    changedDb.push(concert);
  });
  db.concerts = changedDb;
  isChanged ? res.send("changed") : res.send("There is no such id element");
});

router.route("/concerts/:id").delete((req, res) => {
  const concerts_start = db.concerts.length;
  db.concerts = db.concerts.filter((item) => item.id != req.params.id);
  if (db.concerts.length < concerts_start) {
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
