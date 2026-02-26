const mongoose = require("mongoose");

const panditSlotSchema = new mongoose.Schema(
  {
    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    isBooked: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

//  Prevent duplicate slots
panditSlotSchema.index(
  { panditId: 1, date: 1, slot: 1 },
  { unique: true }
);

module.exports = mongoose.model("PanditSlot", panditSlotSchema);