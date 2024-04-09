const express = require("express");
const router = express.Router();

// testimonials
const TestimonialController = require("../controllers/testimonials.controller");

router.get("/testimonials", TestimonialController.getAll);
router.get("/testimonials/:id", TestimonialController.getById);
router.post("/testimonials", TestimonialController.addOne);
router.put("/testimonials/:id", TestimonialController.updateOne);
router.delete("/testimonials/:id", TestimonialController.deleteOne);

module.exports = router;
