const mongoose = require("mongoose");

const PanditProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
      required: true
    },

    fullName: String,

    location: {
      city: String,
      state: String,
      pincode: String,
      lat: Number,
      lng: Number
    },

    experienceYears: Number,
    specializations: [String],
    languages: [String],

    documents: {
      idProofUrl: String,
      certificateUrl: String
    },

    verified: { type: Boolean, default: false },

    status: {
      type: String,
      enum: ["INCOMPLETE", "PENDING", "ACTIVE", "REJECTED"],
      default: "INCOMPLETE"
    },

    rejectionReason: String,

    // 🔥 MODULE 3 – DERIVED FIELDS (DO NOT EDIT MANUALLY)
    ritualCount: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: null
    },
    maxPrice: {
      type: Number,
      default: null
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("PanditProfile", PanditProfileSchema);
