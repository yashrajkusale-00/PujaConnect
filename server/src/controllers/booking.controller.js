const Booking = require("../models/Booking");
const PanditSlot = require("../models/PanditSlot");

exports.createBooking = async (req, res) => {
  const userId = req.user.id;
  const { panditId, panditRitualId, date, slot } = req.body;

  // 1️⃣ Check slot exists and is not already locked
  const slotExists = await PanditSlot.findOne({
    panditId,
    date,
    slot,
    isBooked: false
  });

  if (!slotExists) {
    return res.status(400).json({ message: "Slot not available" });
  }

  // 2️⃣ Enforce ONLY ONE PENDING booking per slot (GLOBAL RULE)
  const existingPending = await Booking.findOne({
    panditId,
    date,
    slot,
    status: "PENDING"
  });

  if (existingPending) {
    return res.status(409).json({
      message: "Slot already requested"
    });
  }

  // 3️⃣ Create booking
  const booking = await Booking.create({
    userId,
    panditId,
    panditRitualId,
    date,
    slot,
    status: "PENDING"
  });

  res.status(201).json({
    message: "Booking request sent",
    booking
  });
};


// booking accept
exports.acceptBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking || booking.status !== "PENDING") {
    return res.status(400).json({ message: "Invalid booking state" });
  }

  // ATOMIC SLOT LOCK
  const slotLocked = await PanditSlot.findOneAndUpdate(
    {
      panditId: booking.panditId,
      date: booking.date,
      slot: booking.slot,
      isBooked: false
    },
    { isBooked: true }
  );

  if (!slotLocked) {
    return res.status(409).json({ message: "Slot already booked" });
  }

  booking.status = "ACCEPTED";
  await booking.save();

  res.json({ message: "Booking accepted" });
};

// booking Reject

exports.rejectBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (!booking || booking.status !== "PENDING") {
    return res.status(400).json({ message: "Invalid booking state" });
  }

  booking.status = "REJECTED";
  await booking.save();

  res.json({ message: "Booking rejected" });
};