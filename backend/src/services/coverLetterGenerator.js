const axios = require('axios');
const { OLLAMA_URL, OLLAMA_MODEL, TIMEOUT } = require('../config/ollama');

const generateCoverLetter = async (resumeData, jobDescription, additionalRequirements = '', templateContent = null) => {
  let templatePart = '';
  if (templateContent) {
    templatePart = `\n\nИспользуй следующий шаблон для структуры письма (подставь данные вместо {{...}}):\n${templateContent}\n`;
  }

  const prompt = `
Ты — профессиональный HR-специалист и эксперт по написанию сопроводительных писем.
На основе данных резюме и описания вакансии создай убедительное сопроводительное письмо.

Данные резюме:
- ФИО: ${resumeData.fullName || 'не указано'}
- Email: ${resumeData.email || 'не указан'}
- Телефон: ${resumeData.phone || 'не указан'}
- Краткое описание: ${resumeData.summary || 'не указано'}
- Опыт работы: ${resumeData.experience || 'не указан'}
- Образование: ${resumeData.education || 'не указано'}
- Навыки: ${resumeData.skills || 'не указаны'}

Описание вакансии:
${jobDescription}

Дополнительные требования:
${additionalRequirements || 'нет'}
${templatePart}

Напиши профессиональное сопроводительное письмо на русском языке.
Письмо должно быть структурированным, убедительным и соответствовать требованиям вакансии.
Используй официально-деловой стиль.
Ответ должен содержать только текст письма без лишних пояснений.`;

  try {
    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: OLLAMA_MODEL,
        prompt: prompt,
        stream: false
      },
      {
        timeout: TIMEOUT
      }
    );

    return response.data.response.trim();
  } catch (error) {
    throw new Error(`Ошибка генерации сопроводительного письма: ${error.message}`);
  }
};

module.exports = generateCoverLetter;