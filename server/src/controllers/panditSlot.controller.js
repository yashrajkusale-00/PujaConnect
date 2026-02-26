const PanditSlot = require("../models/PanditSlot");

exports.addSlot = async (req, res) => {
  try {
    const panditId = req.user.id;
    const { date, slot } = req.body;

    const newSlot = await PanditSlot.create({
      panditId,
      date,
      slot
    });

    res.status(201).json({
      message: "Slot added",
      slot: newSlot
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Slot already exists"
      });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.getAvailableSlots = async (req, res) => {
  const { panditId, date } = req.query;

  const slots = await PanditSlot.find({
    panditId,
    date,
    isBooked: false
  }).select("date slot");

  res.json(slots);
};