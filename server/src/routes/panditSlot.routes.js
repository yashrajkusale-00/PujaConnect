const express = require("express");
const router = express.Router();

const controller = require("../controllers/panditSlot.controller");
const auth = require("../middleware/authMiddleware");
const ensurePanditActive = require("../middleware/ensurePanditActive");
const validate = require("../middleware/validate");
const { addSlotSchema } = require("../validators/panditSlot.schema");

// Pandit adds availability
router.post(
  "/",
  auth(["pandit"]),
  ensurePanditActive,
  validate(addSlotSchema),
  controller.addSlot
);

// User views available slots
router.get(
  "/available",
  controller.getAvailableSlots
);

module.exports = router;