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

const SMTP_SETTINGS = sequelize.define('SMTP_SETTINGS', {
  // Model attributes are defined here
  server_id: {
    type: DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey : true,
  },
  server_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty: {
            msg: 'Please, specify the server name',
        },
    }
},
    server_host: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please, specify the SMTP host ( Example : smtp.gmail.com )',
            },
        }
    },
    server_port: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please, specify the SMTP port',
            },
        }
    },
    server_username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please, specify the SMTP username',
            },
        }
    },
    server_password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please, specify the SMTP password',
            },
        }
    },
    server_from_email : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Please, specify the SMTP from email ( Example : my-company@example.com )',
            },
        }
    },
}, {
    // Options
});

module.exports = SMTP_SETTINGS;