const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');

router.get('/', resumeController.getResumes);
router.get('/:id', resumeController.getResumeById);
router.post('/', resumeController.createResume);
router.post('/generate', resumeController.generateResumeFromData);
router.put('/:id', resumeController.updateResume);
router.delete('/:id', resumeController.deleteResume);

module.exports = router;