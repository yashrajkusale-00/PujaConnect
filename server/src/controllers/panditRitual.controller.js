const PanditRitual = require("../models/PanditRitual");
const Ritual = require("../models/Ritual");

exports.addRitual = async (req, res) => {
  try {
    const panditId = req.user.id;
    const { ritualId, price, duration } = req.body;

    const ritual = await Ritual.findOne({ _id: ritualId, isActive: true });
    if (!ritual) {
      return res.status(404).json({ message: "Ritual not found or inactive" });
    }

    const panditRitual = await PanditRitual.create({
      panditId,
      ritualId,
      price,
      duration
    });

    res.status(201).json({
      message: "Ritual added successfully",
      panditRitual
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ message: "Ritual already added" });
    }
    res.status(500).json({ message: err.message });
  }
};

exports.updateRitual = async (req, res) => {
  try {
    const panditId = req.user.id;
    const ritualId = req.params.id;

    const ritual = await PanditRitual.findOneAndUpdate(
      { _id: ritualId, panditId },
      req.body,
      { new: true }
    );

    if (!ritual) {
      return res.status(404).json({ message: "Ritual not found" });
    }

    res.json({ message: "Ritual updated", ritual });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPanditRituals = async (req, res) => {
  try {
    const { panditId } = req.params;

    const rituals = await PanditRitual.find({
      panditId,
      isActive: true
    })
      .populate("ritualId", "name description")
      .select("price duration ritualId");

    res.json(rituals.map(r => ({
      name: r.ritualId.name,
      description: r.ritualId.description,
      price: r.price,
      duration: r.duration
    })));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
