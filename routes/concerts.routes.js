const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");

// concerts

router.route("/concerts/:id").get((req, res) => {
  db.concerts.forEach((ob) => {
    if (ob.id == req.params.id) {
      return res.json(ob);
    } else {
      return res.send("There is no such id element");
    }
  });
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
  db.concerts.forEach((ob) => {
    const id = req.params.id;
    if (ob.id == id) {
      const { performer, genre, price, day, image } = req.body;
      ob = { id, performer, genre, price, day, image };
      return res.send("changed");
    }
  });
  return res.send("There is no such id element");
});

router.route("/concerts/:id").delete((req, res) => {
  const concerts_start = db.concerts.length;
  db.concerts.filter((item) => item.id != req.params.id);
  if (db.concerts.length < concerts_start) {
    res.send("deleted");
  } else {
    res.send("There is no such id element");
  }
});

module.exports = router;
