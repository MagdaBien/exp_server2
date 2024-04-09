const Concert = require("../models/concert.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
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
