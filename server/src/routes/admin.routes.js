const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

const PanditProfile = require("../models/PanditProfile");
const PanditVerificationLog = require("../models/PanditVerificationLog");
const auth = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const { rejectPanditSchema } = require("../validators/rejectPandit.schema");

router.get("/pandits", auth(["admin"]), async (req, res) => {
  const pandits = await PanditProfile.find({ status: "PENDING" });
  res.json(pandits);
});

router.post("/pandit/:id/approve", auth(["admin"]), async (req, res) => {
  const pandit = await PanditProfile.findById(req.params.id);
  if (!pandit || pandit.status !== "PENDING") {
    return res.status(400).json({ message: "Invalid state" });
  }

  pandit.status = "ACTIVE";
  pandit.verified = true;
  await pandit.save();

  await PanditVerificationLog.create({
    panditId: pandit._id,
    adminId: req.user.id,
    action: "APPROVED"
  });

  res.json({ message: "Pandit approved" });
});

router.post(
  "/pandit/:id/reject",
  auth(["admin"]),
  validate(rejectPanditSchema),
  async (req, res) => {
    const pandit = await PanditProfile.findById(req.params.id);
    if (!pandit || pandit.status !== "PENDING") {
      return res.status(400).json({ message: "Invalid state" });
    }

    pandit.status = "REJECTED";
    pandit.verified = false;
    pandit.rejectionReason = req.body.reason;
    await pandit.save();

    await PanditVerificationLog.create({
      panditId: pandit._id,
      adminId: req.user.id,
      action: "REJECTED",
      reason: req.body.reason
    });

    res.json({ message: "Pandit rejected" });
  }
);

router.get("/bookings", auth(["admin"]), async (req, res) => {
  const { status } = req.query;

  const filter = {};
  if (status) {
    filter.status = status;
  }

  const bookings = await Booking.find(filter)
    .populate("userId", "email role")
    .populate("panditId", "email role")
    .populate("panditRitualId");

  res.json(bookings);
});

router.post(
  "/pandit/:id/disable",
  auth(["admin"]),
  async (req, res) => {
    const pandit = await PanditProfile.findById(req.params.id);

    if (!pandit) {
      return res.status(404).json({ message: "Pandit not found" });
    }

    pandit.status = "SUSPENDED";
    pandit.verified = false;

    await pandit.save();

    res.json({ message: "Pandit disabled" });
  }
);

module.exports = router;
