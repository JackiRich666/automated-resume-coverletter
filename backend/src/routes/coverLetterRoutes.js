const express = require('express');
const router = express.Router();
const coverLetterController = require('../controllers/coverLetterController');

router.get('/', coverLetterController.getCoverLetters);
router.get('/:id', coverLetterController.getCoverLetterById);
router.post('/generate', coverLetterController.generateCoverLetterFromData);
router.delete('/:id', coverLetterController.deleteCoverLetter);

module.exports = router;