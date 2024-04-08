const express = require("express");
const router = express.Router();

// testimonials
const TestymonialController = require("../controllers/testymonials.controller");

router.get("/testymonials", TestymonialController.getAll);
router.get("/testymonials/:id", TestymonialController.getById);
router.post("/testymonials", TestymonialController.addOne);
router.put("/testymonials/:id", TestymonialController.updateOne);
router.delete("/testymonials/:id", TestymonialController.deleteOne);

module.exports = router;
