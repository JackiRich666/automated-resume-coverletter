const analyzeResume = require('../services/analysisService');
const { validateAnalysis } = require('../utils/validation');
const { AppError } = require('../utils/errorHandler');

const analyzeResumeText = async (req, res, next) => {
  try {
    const { error } = validateAnalysis(req.body);
    if (error) {
      return next(new AppError(error.details[0].message, 400));
    }

    const { text } = req.body;
    const result = await analyzeResume(text);
    res.json(result);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = {
  analyzeResumeText
};