const PanditProfile = require("../models/PanditProfile");

module.exports = async (req, res, next) => {
  const profile = await PanditProfile.findOne({ userId: req.user.id });

  if (profile && profile.status === "PENDING") {
    return res
      .status(400)
      .json({ message: "Profile under review. Editing disabled." });
  }

  next();
};
