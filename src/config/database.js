const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env.local') });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

module.exports = sequelize;
