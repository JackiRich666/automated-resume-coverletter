const CoverLetter = require('../models/CoverLetter');
const Resume = require('../models/Resume');
const Template = require('../models/Template');
const generateCoverLetter = require('../services/coverLetterGenerator');
const { validateCoverLetterGenerate } = require('../utils/validation');
const { AppError } = require('../utils/errorHandler');

const getCoverLetters = async (req, res, next) => {
  try {
    const letters = await CoverLetter.findAll();
    res.json(letters);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getCoverLetterById = async (req, res, next) => {
  try {
    const letter = await CoverLetter.findById(req.params.id);
    if (!letter) {
      return next(new AppError('Письмо не найдено', 404));
    }
    res.json(letter);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const generateCoverLetterFromData = async (req, res, next) => {
  try {
    const { error } = validateCoverLetterGenerate(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    const { resumeId, jobDescription, additionalRequirements, templateId } = req.body;
    const resume = await Resume.findById(resumeId);
    if (!resume) {
      return next(new AppError('Резюме не найдено', 404));
    }

    let templateContent = null;
    if (templateId) {
      const template = await Template.findById(templateId);
      if (template && template.type === 'cover_letter') {
        templateContent = template.content;
      }
    }

    const generatedText = await generateCoverLetter(
      resume,
      jobDescription,
      additionalRequirements,
      templateContent
    );

    const newLetter = await CoverLetter.create({
      resume_id: resumeId,
      job_description: jobDescription,
      additional_requirements: additionalRequirements || '',
      generated_text: generatedText
    });

    res.status(201).json(newLetter);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const deleteCoverLetter = async (req, res, next) => {
  try {
    const result = await CoverLetter.delete(req.params.id);
    res.json(result);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = {
  getCoverLetters,
  getCoverLetterById,
  generateCoverLetterFromData,
  deleteCoverLetter
};