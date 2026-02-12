const mongoose = require("mongoose");

const PanditVerificationLogSchema = new mongoose.Schema(
  {
    panditId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PanditProfile",
      required: true
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    action: {
      type: String,
      enum: ["APPROVED", "REJECTED"],
      required: true
    },
    reason: String
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "PanditVerificationLog",
  PanditVerificationLogSchema
);
