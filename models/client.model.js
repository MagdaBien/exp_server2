const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
  email: { type: String, required: true },
  client: { type: String, required: true },
});

module.exports = mongoose.model("Client", clientSchema);
