const Seat = require("../models/seat.model");
//const Client = require("../models/client.model");
const socket = require("socket.io");

const checkIsSeatTaken = (chosenSeat, chosenDay) => {
  return Seat.findOne({
    $and: [{ seat: Number(chosenSeat) }, { day: Number(chosenDay) }],
  });
};

/*
const findClientByData = (chosenClient, chosenEmail) => {
  return Client.findOne({
    $and: [{ client: chosenClient }, { email: chosenEmail }],
  });
};
*/

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(501).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const dep = await Seat.findById(req.params.id);
    if (!dep) res.status(404).json({ message: "Not found" });
    else res.json(dep);
  } catch (err) {
    res.status(502).json({ message: err });
  }
};

exports.addOne = async (req, res) => {
  const { day, seat, client, email } = req.body;
  const isSeatTaken = await checkIsSeatTaken(seat, day);
  //const isClientExists = await findClientByData(client, email);

  if (isSeatTaken) {
    res.send("The slot is already taken...");
  } else {
    try {
      const newSeat = new Seat({ day, seat, client, email });
      await newSeat.save();
      req.io.emit("seatsUpdated", await Seat.find());
      res.send("added");
    } catch (err) {
      res.status(503).json({ message: err });
    }
  }
};

exports.updateOne = async (req, res) => {
  const { day, seat, client } = req.body;
  try {
    const dep = await Seat.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { day, seat, client } },
      { returnDocument: "after" }
    );
    if (dep) {
      res.json(dep);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(504).json({ message: err });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const dep = await Seat.findOneAndDelete({ _id: req.params.id });
    if (dep) {
      res.json(dep);
    } else res.status(404).json({ message: "Not found..." });
  } catch (err) {
    res.status(505).json({ message: err });
  }
};
