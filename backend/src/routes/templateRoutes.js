const express = require('express');
const router = express.Router();
const templateController = require('../controllers/templateController');

router.get('/', templateController.getTemplates);
router.get('/:id', templateController.getTemplateById);
router.get('/type/:type', templateController.getTemplatesByType);

module.exports = router;