const express = require("express");
const router = express.Router();

const controller = require("../controllers/panditRitual.controller");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const ensurePanditActive = require("../middleware/ensurePanditActive");
const {
  addRitualSchema,
  updateRitualSchema
} = require("../validators/panditRitual.schema");

// Add ritual
router.post(
  "/",
  auth(["pandit"]),
  ensurePanditActive,
  validate(addRitualSchema),
  controller.addRitual
);

// Update ritual
router.patch(
  "/:id",
  auth(["pandit"]),
  ensurePanditActive,
  validate(updateRitualSchema),
  controller.updateRitual
);

module.exports = router;
