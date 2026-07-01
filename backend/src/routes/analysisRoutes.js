const express = require('express');
const router = express.Router();
const analysisController = require('../controllers/analysisController');

router.post('/', analysisController.analyzeResumeText);

module.exports = router;