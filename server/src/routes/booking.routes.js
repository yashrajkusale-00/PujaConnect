const express = require("express");
const router = express.Router();

const controller = require("../controllers/booking.controller");
const auth = require("../middleware/authMiddleware");
const ensurePanditActive = require("../middleware/ensurePanditActive");
const validate = require("../middleware/validate");
const { createBookingSchema } = require("../validators/booking.schema");

// User creates booking
router.post(
  "/",
  auth(["user"]),
  validate(createBookingSchema),
  controller.createBooking
);

// Pandit actions
router.post(
  "/:id/accept",
  auth(["pandit"]),
  ensurePanditActive,
  controller.acceptBooking
);

router.post(
  "/:id/reject",
  auth(["pandit"]),
  ensurePanditActive,
  controller.rejectBooking
);

module.exports = router;