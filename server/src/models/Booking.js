const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    panditRitualId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PanditRitual",
      required: true
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true
    },

    slot: {
      type: String,
      enum: ["MORNING", "EVENING"],
      required: true
    },

    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);