const Concert = require("../models/concert.model");

exports.searchByPerformer = async (req, res) => {
  try {
    const foundConcerts = await Concert.find({
      performer: req.params.performer,
    });
    if (!foundConcerts) res.status(404).json({ message: "Not found" });
    else res.json(foundConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchByGenre = async (req, res) => {
  try {
    const foundConcerts = await Concert.find({
      genre: req.params.genre,
    });
    if (!foundConcerts) res.status(404).json({ message: "Not found" });
    else res.json(foundConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchByPrice = async (req, res) => {
  try {
    const foundConcerts = await Concert.find({
      $and: [
        { price: { $gte: req.params.price_min } },
        { price: { $lte: req.params.price_max } },
      ],
    });
    if (!foundConcerts) res.status(404).json({ message: "Not found" });
    else res.json(foundConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.searchByDay = async (req, res) => {
  try {
    const foundConcerts = await Concert.find({
      day: req.params.day,
    });
    if (!foundConcerts) res.status(404).json({ message: "Not found" });
    else res.json(foundConcerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
