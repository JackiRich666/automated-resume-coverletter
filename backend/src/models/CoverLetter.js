const db = require('../config/database');

const CoverLetter = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM cover_letters ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM cover_letters WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  create: (data) => {
    const { resume_id, job_description, additional_requirements, generated_text } = data;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO cover_letters (resume_id, job_description, additional_requirements, generated_text)
         VALUES (?, ?, ?, ?)`,
        [resume_id, job_description, additional_requirements, generated_text],
        function(err) {
          if (err) reject(err);
          else {
            CoverLetter.findById(this.lastID).then(resolve).catch(reject);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM cover_letters WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ deleted: true });
      });
    });
  }
};

module.exports = CoverLetter;