const express = require("express");
const router = express.Router();

const PanditProfile = require("../models/PanditProfile");
const auth = require("../middleware/authMiddleware");
const ensureNotPending = require("../middleware/ensureNotPending");
const validate = require("../middleware/validate");
const { panditProfileSchema } = require("../validators/panditProfile.schema");

router.post(
  "/profile",
  auth(["pandit"]),
  ensureNotPending,
  validate(panditProfileSchema),
  async (req, res) => {
    let profile = await PanditProfile.findOne({ userId: req.user.id });

    if (!profile) {
      profile = new PanditProfile({ userId: req.user.id, ...req.body });
    } else {
      Object.assign(profile, req.body);
    }

    await profile.save();
    res.json({ message: "Profile saved", status: profile.status });
  }
);

router.post(
  "/submit",
  auth(["pandit"]),
  async (req, res) => {
    const profile = await PanditProfile.findOne({ userId: req.user.id });
    if (!profile || profile.status !== "INCOMPLETE") {
      return res.status(400).json({ message: "Invalid profile state" });
    }
    profile.status = "PENDING";
    await profile.save();
    res.json({ message: "Submitted for verification" });
  }
);

module.exports = router;
