const db = require('../config/database');

const Resume = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM resumes ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM resumes WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  create: (data) => {
    const { title, fullName, email, phone, address, summary, experience, education, skills } = data;
    return new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO resumes (title, fullName, email, phone, address, summary, experience, education, skills)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, fullName, email, phone, address, summary, experience, education, skills],
        function(err) {
          if (err) reject(err);
          else {
            Resume.findById(this.lastID).then(resolve).catch(reject);
          }
        }
      );
    });
  },

  update: (id, data) => {
    const { title, fullName, email, phone, address, summary, experience, education, skills } = data;
    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE resumes 
         SET title = ?, fullName = ?, email = ?, phone = ?, address = ?, summary = ?, experience = ?, education = ?, skills = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [title, fullName, email, phone, address, summary, experience, education, skills, id],
        function(err) {
          if (err) reject(err);
          else {
            Resume.findById(id).then(resolve).catch(reject);
          }
        }
      );
    });
  },

  delete: (id) => {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM resumes WHERE id = ?', [id], function(err) {
        if (err) reject(err);
        else resolve({ deleted: true });
      });
    });
  }
};

module.exports = Resume;