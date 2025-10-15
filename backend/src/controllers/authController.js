const { getDB } = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret';
const SALT_ROUNDS = 10;

exports.register = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { name, email, password } = req.body;
  const db = getDB();

  const sqlCheck = 'SELECT id FROM users WHERE email = ?';
  db.get(sqlCheck, [email], (err, row) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (row) return res.status(400).json({ error: 'Email already registered' });

    bcrypt.hash(password, SALT_ROUNDS, (err, hashed) => {
      if (err) return res.status(500).json({ error: 'Hashing error' });

      const insert = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
      db.run(insert, [name, email, hashed], function (err) {
        if (err) return res.status(500).json({ error: 'DB insert error' });
        const userId = this.lastID;
        const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: userId, name, email } });
      });
    });
  });
};

exports.login = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { email, password } = req.body;
  const db = getDB();

  const sql = 'SELECT id, name, email, password FROM users WHERE email = ?';
  db.get(sql, [email], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    bcrypt.compare(password, user.password, (err, same) => {
      if (err) return res.status(500).json({ error: 'Compare error' });
      if (!same) return res.status(400).json({ error: 'Invalid credentials' });

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
  });
};
