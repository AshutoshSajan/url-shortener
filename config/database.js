const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.POSTGRES_URL, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
