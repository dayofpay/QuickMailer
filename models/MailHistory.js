const { Sequelize, DataTypes } = require('sequelize');
const config = require('../utils/config');
const sequelize = new Sequelize({
  host : config.getProperty('DB_HOST'),
  username : config.getProperty('DB_USERNAME'),
  password : config.getProperty('DB_PASSWORD'),
  database : config.getProperty('DB_DATABASE'),
  dialect : 'mysql',
  logging : false
});

const MAIL_HISTORY = sequelize.define('MAIL_HISTORY', {
  // Model attributes are defined here
  mail_id: {
    type: DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey : true,
  },
  template_used: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail_status : {
    type: DataTypes.STRING,
    validate: {
        isIn: [['SENT', 'FAILED']],
    },
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  }
    // Options
});

module.exports = MAIL_HISTORY;