const Joi = require("joi");

exports.addRitualSchema = Joi.object({
  ritualId: Joi.string().required(),
  price: Joi.number().min(1).required(),
  duration: Joi.number().min(15).required()
});

exports.updateRitualSchema = Joi.object({
  price: Joi.number().min(1).optional(),
  duration: Joi.number().min(15).optional(),
  isActive: Joi.boolean().optional()
});
