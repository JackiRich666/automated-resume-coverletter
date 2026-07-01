const Resume = require('../models/Resume');
const generateResume = require('../services/resumeGenerator');
const { validateResume } = require('../utils/validation');
const { AppError } = require('../utils/errorHandler');

const getResumes = async (req, res, next) => {
  try {
    const resumes = await Resume.findAll();
    res.json(resumes);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getResumeById = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);
    if (!resume) {
      return next(new AppError('Резюме не найдено', 404));
    }
    res.json(resume);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const createResume = async (req, res, next) => {
  try {
    const { error } = validateResume(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    const resume = await Resume.create(req.body);
    res.status(201).json(resume);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const updateResume = async (req, res, next) => {
  try {
    const { error } = validateResume(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    const resume = await Resume.update(req.params.id, req.body);
    if (!resume) {
      return next(new AppError('Резюме не найдено', 404));
    }
    res.json(resume);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const deleteResume = async (req, res, next) => {
  try {
    const result = await Resume.delete(req.params.id);
    res.json(result);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const generateResumeFromData = async (req, res, next) => {
  try {
    const { error } = validateResume(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }
    const generated = await generateResume(req.body);
    
    res.json(generated);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = {
  getResumes,
  getResumeById,
  createResume,
  updateResume,
  deleteResume,
  generateResumeFromData
};