const axios = require('axios');
const { OLLAMA_URL, OLLAMA_MODEL, TIMEOUT } = require('../config/ollama');

const normalizeFields = (obj) => {
  const result = {};
  for (const key of Object.keys(obj)) {
    const value = obj[key];
    if (Array.isArray(value)) {
      result[key] = value.join(', ');
    } else if (typeof value === 'object' && value !== null) {
      result[key] = JSON.stringify(value);
    } else {
      result[key] = String(value);
    }
  }
  return result;
};

const generateResume = async (userData) => {
  const prompt = `
Ты — профессиональный HR-специалист и эксперт по составлению резюме.
На основе предоставленных данных пользователя создай структурированное резюме в формате JSON.

Данные пользователя:
- ФИО: ${userData.fullName || 'не указано'}
- Email: ${userData.email || 'не указан'}
- Телефон: ${userData.phone || 'не указан'}
- Адрес: ${userData.address || 'не указан'}
- Краткое описание: ${userData.summary || 'не указано'}
- Опыт работы: ${userData.experience || 'не указан'}
- Образование: ${userData.education || 'не указано'}
- Навыки: ${userData.skills || 'не указаны'}

Создай профессиональное резюме. Ответ должен быть ТОЛЬКО в формате JSON со следующей структурой:
{
  "title": "Название резюме (придумай на основе данных)",
  "fullName": "ФИО",
  "email": "email",
  "phone": "телефон",
  "address": "адрес",
  "summary": "Краткое описание (улучши, если нужно)",
  "experience": "Опыт работы (отформатируй профессионально)",
  "education": "Образование (отформатируй профессионально)",
  "skills": "Навыки (отформатируй профессионально)"
}

Не добавляй никакого текста кроме JSON.`;

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

    let generatedText = response.data.response;
    const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      generatedText = jsonMatch[0];
    }

    const parsed = JSON.parse(generatedText);
    
    const normalized = normalizeFields(parsed);
    return normalized;
  } catch (error) {
    throw new Error(`Ошибка генерации резюме: ${error.message}`);
  }
};

module.exports = generateResume;