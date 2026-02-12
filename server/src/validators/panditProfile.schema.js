const Joi = require("joi");

exports.panditProfileSchema = Joi.object({
  fullName: Joi.string().required(),
  location: Joi.object({
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required()
  }).required(),
  experienceYears: Joi.number().required(),
  specializations: Joi.array().items(Joi.string()).required(),
  languages: Joi.array().items(Joi.string()).required(),
  documents: Joi.object({
    idProofUrl: Joi.string().uri().required()
  }).required()
});
