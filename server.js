const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

const path = require("path");
const socket = require("socket.io");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(8000, () => {
  console.log("Server is running on port: 8000");
});

const io = socket(server);

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", testimonialsRoutes);
app.use("/api", concertsRoutes);
app.use("/api", seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

app.use((req, res) => {
  res.send("error 404");
});

// connects our backend code with the database
mongoose.connect("mongodb://0.0.0.0:27017/NewWaveDB", {
  useNewUrlParser: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Connected to the database");
});
db.on("error", (err) => console.log("Error " + err));

io.on("connection", (socket) => {
  // console.log("New client! Its id: " + socket.id);

  socket.on("disconnect", () => {
    //console.log("Oh, socket " + socket.id + " has left");
  });
});
