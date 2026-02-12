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

    rejectionReason: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("PanditProfile", PanditProfileSchema);
