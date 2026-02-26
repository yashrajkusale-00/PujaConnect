const Joi = require("joi");

exports.createBookingSchema = Joi.object({
  panditId: Joi.string().required(),
  panditRitualId: Joi.string().required(),
  date: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required(),
  slot: Joi.string().valid("MORNING", "EVENING").required()
});