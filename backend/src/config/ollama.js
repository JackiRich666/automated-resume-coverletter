const dotenv = require('dotenv');

dotenv.config();

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = 'qwen2.5:14b';
const TIMEOUT = 120000;

module.exports = {
  OLLAMA_URL,
  OLLAMA_MODEL,
  TIMEOUT
};