const { getDB } = require('../config/db');
const { validationResult } = require('express-validator');

exports.getProfile = (req, res) => {
  const db = getDB();
  const userId = req.user.id;
  db.get('SELECT id, name, email, created_at FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  });
};

exports.updateProfile = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const db = getDB();
  const userId = req.user.id;
  const { name, email } = req.body;

  // Simple update — if email change, ensure uniqueness
  if (email) {
    db.get('SELECT id FROM users WHERE email = ? AND id != ?', [email, userId], (err, row) => {
      if (err) return res.status(500).json({ error: 'DB error' });
      if (row) return res.status(400).json({ error: 'Email already in use' });
      doUpdate();
    });
  } else {
    doUpdate();
  }

  function doUpdate() {
    const updates = [];
    const params = [];
    if (name) { updates.push('name = ?'); params.push(name); }
    if (email) { updates.push('email = ?'); params.push(email); }
    if (updates.length === 0) return res.status(400).json({ error: 'No fields to update' });

    params.push(userId);
    const sql = `UPDATE users SET ${updates.join(', ')} WHERE id = ?`;
    db.run(sql, params, function (err) {
      if (err) return res.status(500).json({ error: 'DB update error' });
      res.json({ success: true });
    });
  }
};
