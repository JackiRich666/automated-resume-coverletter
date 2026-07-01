const sqlite3 = require('sqlite3');
const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const dbPath = path.resolve(process.env.DB_PATH || './database/dev.sqlite');
const dbDir = path.dirname(dbPath);

if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS resumes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      fullName TEXT,
      email TEXT,
      phone TEXT,
      address TEXT,
      summary TEXT,
      experience TEXT,
      education TEXT,
      skills TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS cover_letters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      resume_id INTEGER,
      job_description TEXT,
      additional_requirements TEXT,
      generated_text TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(name, type)
    )
  `);

  const templates = [
    { name: 'Классическое резюме', type: 'resume', content: '{{fullName}}\n{{email}} | {{phone}}\n{{address}}\n\nО себе: {{summary}}\n\nОпыт работы:\n{{experience}}\n\nОбразование:\n{{education}}\n\nНавыки:\n{{skills}}' },
    { name: 'Современное резюме', type: 'resume', content: '# {{fullName}}\n## Контакты: {{email}}, {{phone}}\n### Адрес: {{address}}\n\n---\n\n**О себе**\n{{summary}}\n\n**Опыт работы**\n{{experience}}\n\n**Образование**\n{{education}}\n\n**Навыки**\n{{skills}}' },
    { name: 'Стандартное письмо', type: 'cover_letter', content: 'Уважаемый работодатель,\n\nЯ, {{fullName}}, хотел бы предложить свою кандидатуру на вакансию.\n\n{{summary}}\n\nМой опыт: {{experience}}\n\n{{skills}}\n\nС уважением,\n{{fullName}}' },
    { name: 'Деловое письмо', type: 'cover_letter', content: 'Кому: Работодателю\nОт: {{fullName}}\nТема: Отклик на вакансию\n\nУважаемые господа,\n\nЯ заинтересован в вакансии, которую вы предлагаете. Мои навыки и опыт соответствуют вашим требованиям.\n\n{{experience}}\n\n{{education}}\n\n{{skills}}\n\nБуду рад обсудить детали на собеседовании.\n\nС уважением,\n{{fullName}}' }
  ];

  templates.forEach(t => {
    db.run(
      'INSERT OR IGNORE INTO templates (name, type, content) VALUES (?, ?, ?)',
      [t.name, t.type, t.content]
    );
  });
});

module.exports = db;