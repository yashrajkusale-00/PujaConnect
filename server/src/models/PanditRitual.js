const mongoose = require("mongoose");

const panditRitualSchema = new mongoose.Schema(
  {
    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    ritualId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ritual",
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    duration: {
      type: Number, // minutes
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

panditRitualSchema.index({ panditId: 1, ritualId: 1 }, { unique: true });

module.exports = mongoose.model("PanditRitual", panditRitualSchema);
