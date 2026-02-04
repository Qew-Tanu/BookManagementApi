const sequelize = require('../config/database');
const User = require('./user');
const Book = require('./book');

const db = {
  sequelize,
  User,
  Book
};

module.exports = db;
