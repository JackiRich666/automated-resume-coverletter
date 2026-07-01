const templateService = require('../services/templateService');
const { AppError } = require('../utils/errorHandler');

const getTemplates = async (req, res, next) => {
  try {
    const templates = await templateService.getAllTemplates();
    res.json(templates);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getTemplateById = async (req, res, next) => {
  try {
    const template = await templateService.getTemplateById(req.params.id);
    if (!template) {
      return next(new AppError('Шаблон не найден', 404));
    }
    res.json(template);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getTemplatesByType = async (req, res, next) => {
  try {
    const { type } = req.params;
    if (type !== 'resume' && type !== 'cover_letter') {
      return next(new AppError('Некорректный тип шаблона', 400));
    }
    const templates = await templateService.getTemplatesByType(type);
    res.json(templates);
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

module.exports = {
  getTemplates,
  getTemplateById,
  getTemplatesByType
};