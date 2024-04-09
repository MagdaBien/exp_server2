const Testimonial = require("../models/testimonial.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const foundTestimonial = await Testimonial.findById(req.params.id);
    if (!foundTestimonial) res.status(404).json({ message: "Not found" });
    else res.json(foundTestimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  try {
    const { client, text } = req.body;
    const newTestimonial = new Testimonial({ client, text });
    await newTestimonial.save();
    res.send("added");
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.updateOne = async (req, res) => {
  const { client, text } = req.body;

  try {
    const foundTestimonial = await Testimonial.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { client, text } },
      { returnDocument: "after" }
    );
    if (foundTestimonial) {
      res.json(foundTestimonial);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const foundTestimonial = await Testimonial.findOneAndDelete({
      _id: req.params.id,
    });
    if (foundTestimonial) {
      res.json(foundTestimonial);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
