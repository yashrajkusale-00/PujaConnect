const Joi = require("joi");

exports.addSlotSchema = Joi.object({
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  slot: Joi.string().valid("MORNING", "EVENING").required()
});