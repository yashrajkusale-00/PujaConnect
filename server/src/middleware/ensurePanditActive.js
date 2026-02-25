const PanditProfile = require("../models/PanditProfile");

module.exports = async (req, res, next) => {
  const profile = await PanditProfile.findOne({ userId: req.user.id });

  if (!profile || profile.status !== "ACTIVE") {
    return res.status(403).json({
      message: "Only verified pandits can perform this action"
    });
  }

  next();
};
