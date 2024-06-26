const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const helmet = require("helmet");

const testimonialsRoutes = require("./routes/testimonials.routes");
const concertsRoutes = require("./routes/concerts.routes");
const seatsRoutes = require("./routes/seats.routes");

const path = require("path");
const socket = require("socket.io");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());

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

const NODE_ENV = process.env.NODE_ENV;
let dbUri = "";

if (NODE_ENV === "production")
  dbUri =
    "mongodb+srv://magbie1978:${process.env.DB_PASS}@cluster0.ut7tgmr.mongodb.net/NewWaveDB?retryWrites=true&w=majority&appName=Cluster0";
else if (NODE_ENV === "test") dbUri = "mongodb://localhost:27017/NewWaveDBtest";
else dbUri = "mongodb://localhost:27017/NewWaveDB";

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
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

module.exports = server;
