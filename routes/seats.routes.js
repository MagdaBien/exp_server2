const express = require("express");
const router = express.Router();
const db = require("./../db");
const { v4: uuidv4 } = require("uuid");
const socket = require("socket.io");

// seats

const checkIsSeatTaken = (chosenSeat, chosenDay) => {
  return db.seats.some(
    (seat) => seat.seat === Number(chosenSeat) && seat.day === Number(chosenDay)
  );
};

router.route("/seats/:id").get((req, res) => {
  const selectedSeat = db.seats.find((seat) => seat.id == req.params.id);
  if (selectedSeat) {
    res.json(selectedSeat);
  } else {
    res.send("There is no such id element");
  }
});

router.route("/seats").get((req, res) => {
  res.json(db.seats);
});

router.route("/seats").post((req, res) => {
  const { day, seat, client, email } = req.body;
  const isSeatTaken = checkIsSeatTaken(seat, day);
  //res.send("isSeatTaken: " + isSeatTaken);
  if (isSeatTaken) {
    res.send("The slot is already taken...");
  } else {
    const id = uuidv4();
    db.seats.push({ id, day: Number(day), seat: Number(seat), client, email });
    req.io.emit("seatsUpdated", db.seats);
    res.send("added");
  }
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
