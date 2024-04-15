const express = require("express");
const router = express.Router();

// concerts

const ConcertController = require("../controllers/concerts.controller");
const ConcertSearchController = require("../controllers/concerts.search.controller");

router.get("/concerts", ConcertController.getAll);
router.get("/concerts/:id", ConcertController.getById);
router.post("/concerts", ConcertController.addOne);
router.put("/concerts/:id", ConcertController.updateOne);
router.delete("/concerts/:id", ConcertController.deleteOne);

// --- SEARCH -------
router.get(
  "/concerts/performer/:performer",
  ConcertSearchController.searchByPerformer
);
router.get("/concerts/genre/:genre", ConcertSearchController.searchByGenre);
router.get(
  "/concerts/price/:price_min/:price_max",
  ConcertSearchController.searchByPrice
);
router.get("/concerts/day/:day", ConcertSearchController.searchByDay);

module.exports = router;
