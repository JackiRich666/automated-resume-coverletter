const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const resumeRoutes = require('./routes/resumeRoutes');
const coverLetterRoutes = require('./routes/coverLetterRoutes');
const templateRoutes = require('./routes/templateRoutes');
const analysisRoutes = require('./routes/analysisRoutes');
const { errorHandler } = require('./utils/errorHandler');

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use('/api/resumes', resumeRoutes);
app.use('/api/coverletters', coverLetterRoutes);
app.use('/api/templates', templateRoutes);
app.use('/api/analysis', analysisRoutes);

app.use(errorHandler);

module.exports = app;