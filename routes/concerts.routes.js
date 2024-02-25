const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// concerts

router.route("/concerts/:id").get((req, res) => {
  const id = req.params.id;
  const found = db.concerts.find((element) => element.id == id);
  if (found != undefined) {
    db.concerts.forEach((ob) => {
      if (ob.id == req.params.id) return res.json(ob);
    });
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
  const found = db.concerts.find((element) => element.id == id);
  if (found != undefined) {
    const { performer, genre, price, day, image } = req.body;
    db.concerts = db.concerts.map((ob) =>
      ob.id == id ? { id, performer, genre, price, day, image } : ob
    );
    res.send("changed");
  } else {
    res.send("There is no such id element");
  }
});

router.route("/concerts/:id").delete((req, res) => {
  const id = req.params.id;
  const found = db.concerts.find((element) => element.id == id);
  if (found != undefined) {
    db.concerts = db.concerts.filter((ob) => ob.id != req.params.id);
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
