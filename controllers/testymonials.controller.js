const Testymonial = require("../models/testymonial.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testymonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Testymonial.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { client, text } = req.body;
    const newTestymonial = new Testymonial({ client, text });
    await newTestymonial.save();
    res.send("added");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  const { client, text } = req.body;

  try {
    const dep = await Testymonial.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { client, text } },
      { returnDocument: "after" }
    );
    if (dep) {
      res.json(dep);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const dep = await Testymonial.findOneAndDelete({ _id: req.params.id });
    if (dep) {
      res.json(dep);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
