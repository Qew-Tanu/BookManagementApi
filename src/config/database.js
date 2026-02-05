const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectModule: require('pg'),
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;
