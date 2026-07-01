const Joi = require('joi');

const resumeSchema = Joi.object({
  title: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().email().allow('', null),
  phone: Joi.string().allow('', null),
  address: Joi.string().allow('', null),
  summary: Joi.string().allow('', null),
  experience: Joi.string().allow('', null),
  education: Joi.string().allow('', null),
  skills: Joi.string().allow('', null)
});

const coverLetterGenerateSchema = Joi.object({
  resumeId: Joi.number().integer().required(),
  jobDescription: Joi.string().required(),
  additionalRequirements: Joi.string().allow('', null),
  templateId: Joi.number().integer().allow(null)
});

const analysisSchema = Joi.object({
  text: Joi.string().required()
});

const validateResume = (data) => {
  return resumeSchema.validate(data);
};

const validateCoverLetterGenerate = (data) => {
  return coverLetterGenerateSchema.validate(data);
};

const validateAnalysis = (data) => {
  return analysisSchema.validate(data);
};

module.exports = {
  validateResume,
  validateCoverLetterGenerate,
  validateAnalysis
};