/*const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://app_user:app_password@localhost:3306/db_todoapp', {
  dialect: 'mysql', // Assurez-vous que le dialecte est correct
  logging: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  // don't add the timestamp attributes (updatedAt, createdAt)
  define: {
    timestamps: false
  },
  // The retry config if Deadlock Happened
  retry: {
    match: [/Deadlock/i],
    max: 3, // Maximum retry 3 times
    backoffBase: 1000, // Initial backoff duration in ms. Default: 100,
    backoffExponent: 1.5 // Exponent to increase backoff each try. Default: 1.1
  }
});

module.exports = {
  sequelize,
  DataTypes
};*/

const mongoose = require('mongoose');

mongoose.createConnection('mongodb://root:admin@localhost:27017');
