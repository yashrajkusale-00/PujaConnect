const Joi = require("joi");

exports.rejectPanditSchema = Joi.object({
  reason: Joi.string().min(5).required()
});
