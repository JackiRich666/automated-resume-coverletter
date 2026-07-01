const axios = require('axios');
const { OLLAMA_URL, OLLAMA_MODEL, TIMEOUT } = require('../config/ollama');

const analyzeResume = async (resumeText) => {
  const prompt = `
Ты — профессиональный HR-эксперт и карьерный консультант.
Проанализируй предоставленное резюме и дай подробные рекомендации по его улучшению.

Текст резюме:
${resumeText}

Твой ответ должен быть ТОЛЬКО в формате JSON со следующей структурой:
{
  "suggestions": [
    "Совет 1",
    "Совет 2",
    "Совет 3"
  ],
  "verification": "Общая оценка резюме и ключевые замечания"
}

Оцени:
1. Структуру и форматирование
2. Полноту информации
3. Релевантность навыков
4. Достижения и результаты
5. Грамматику и стиль
6. Ключевые слова для ATS (системы отбора резюме)

Дай от 5 до 10 конкретных рекомендаций.`;

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
    return parsed;
  } catch (error) {
    throw new Error(`Ошибка анализа резюме: ${error.message}`);
  }
};

module.exports = analyzeResume;