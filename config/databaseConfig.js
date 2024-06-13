const { Sequelize } = require('sequelize');
const {memory} = require('../utils/memory');
const { getProperty } = require('../utils/config');

// Connect to the QuickMail Data service


exports.databaseConnect = async() => {

    let hostData = {};
        hostData = {
            host: getProperty('DB_HOST'),
            username: getProperty('DB_USERNAME'),
            password: getProperty('DB_PASSWORD'),
            database: getProperty('DB_DATABASE'),
            dialect: 'mysql',
            logging: false,
            timezone: '+03:00',
        }
    const QUICKMAIL_SERVER = new Sequelize(hostData)
    
    try{
        await QUICKMAIL_SERVER.authenticate();
        memory.push(QUICKMAIL_SERVER);
        return {
            message : 'Connected successfuly to QuickMail Server',
            code : 'QUICKMAIL_DB_CONNECT_SUCCESS',
        }
    }
    catch(error){
        console.error('------------------------Fatal Database error------------------------',error);
        console.info('MEMORY Snapshot:',memory);
        return {
            error,
            code : 'QUICKMAIL_DB_CONNECT_FAILURE',
        }
    }
}
