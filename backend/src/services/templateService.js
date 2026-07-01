const Template = require('../models/Template');

const getTemplateById = async (id) => {
  return await Template.findById(id);
};

const getTemplatesByType = async (type) => {
  return await Template.findByType(type);
};

const getAllTemplates = async () => {
  return await Template.findAll();
};

const applyTemplate = (templateContent, data) => {
  let result = templateContent;
  const placeholders = result.match(/\{\{([^}]+)\}\}/g) || [];
  
  placeholders.forEach((placeholder) => {
    const key = placeholder.replace(/\{\{|\}\}/g, '').trim();
    const value = data[key] || '';
    result = result.replace(new RegExp(placeholder, 'g'), value);
  });
  
  return result;
};

module.exports = {
  getTemplateById,
  getTemplatesByType,
  getAllTemplates,
  applyTemplate
};