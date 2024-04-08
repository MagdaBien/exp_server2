const mongoose = require("mongoose");

const testymonialSchema = new mongoose.Schema({
  client: { type: String, required: true },
  text: { type: String, required: true },
});

module.exports = mongoose.model("Testymonial", testymonialSchema);
