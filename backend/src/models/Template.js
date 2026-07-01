const db = require('../config/database');

const Template = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM templates ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  findById: (id) => {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM templates WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  },

  findByType: (type) => {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM templates WHERE type = ? ORDER BY created_at DESC', [type], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
};

module.exports = Template;