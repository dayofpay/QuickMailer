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

const EMAIL_TEMPLATES = sequelize.define('email_templates', {
  // Model attributes are defined here
  template_id: {
    type: DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey : true,
  },
  template_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: {
            msg: 'Please, specify the template name',
        },
    }
  },
  template_subject : {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: {
            msg: 'Please, specify the template subject',
        },
    }
  },
  template_content: {
    type: DataTypes.TEXT('long'),
    allowNull: false,
    validate: {
        notEmpty: {
            msg: 'Please, specify the template content',
        },
    }
  },
  template_content_is_html: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
}, {
    // Options
});

module.exports = EMAIL_TEMPLATES;