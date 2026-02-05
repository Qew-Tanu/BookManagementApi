const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided.' });
  }

  const tokenString = token.startsWith('Bearer ') ? token.slice(7, token.length) : token;

  const jwtSecret = process.env.JWT_SECRET || 'default_secret_key';

  jwt.verify(tokenString, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }
    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
