const express = require("express");
const router = express.Router();

// concerts

const ConcertController = require("../controllers/concerts.controller");

router.get("/concerts", ConcertController.getAll);
router.get("/concerts/:id", ConcertController.getById);
router.post("/concerts", ConcertController.addOne);
router.put("/concerts/:id", ConcertController.updateOne);
router.delete("/concerts/:id", ConcertController.deleteOne);

module.exports = router;
