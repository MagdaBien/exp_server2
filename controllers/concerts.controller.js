const Concert = require("../models/concert.model");
const Seat = require("../models/seat.model");

exports.getAll = async (req, res) => {
  try {
    const concertsAll = await Concert.find();
    const seatsAll = await Seat.find();
    const concertsWithTickets = concertsAll.map((oneConcert) => {
      return {
        _id: oneConcert._id,
        performer: oneConcert.performer,
        genre: oneConcert.genre,
        price: oneConcert.price,
        day: oneConcert.day,
        image: oneConcert.image,
        ticketLeft: 50 - getSeatsByConcertId(seatsAll, oneConcert._id).length,
      };
    });
    //console.log(concertsWithTickets);
    res.json(concertsWithTickets);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

const getSeatsByConcertId = (seats, concertId) => {
  const filteredSeats = seats.filter(
    (seat) => seat.concert === concertId.toString()
  );
  return filteredSeats;
};

exports.getById = async (req, res) => {
  try {
    const foundConcert = await Concert.findById(req.params.id);
    if (!foundConcert) res.status(404).json({ message: "Not found" });
    else res.json(foundConcert);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { name } = req.body;
    const newConcert = new Concert({ name: name });
    await newConcert.save();
    res.send("added");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;

  try {
    const foundConcert = await Concert.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { performer, genre, price, day, image } },
      { returnDocument: "after" }
    );
    if (foundConcert) {
      res.json(foundConcert);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const foundConcert = await Concert.findOneAndDelete({ _id: req.params.id });
    if (foundConcert) {
      res.json(foundConcert);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
