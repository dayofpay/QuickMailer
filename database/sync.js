
const SMTPSettings = require('../models/SMTPSettings');

exports.sync = async() => {
    try{

        const SYNC_MODELS_LIST = {
            MODEL_SMTP_SETTINGS : SMTPSettings,
        }
        // Create the tables if they do not exist
        Array.from(Object.entries(SYNC_MODELS_LIST).map(async (model) => {
            await SYNC_MODELS_LIST[model[0]].sync({});
        }))

    
        // Define testing SMTP SERVER
        const hasDemo = await SMTPSettings.findOne({where : {server_id : 1}});
        if(hasDemo === null){
            SMTPSettings.create({
                server_id : 1,
                server_name : 'Gmail',
                server_host : 'smtp.gmail.com',
                server_port : 465,
                server_username : 'hello@example.com',
                server_password : 'password',
                server_from_email : 'hello@example.com',
            })
        }
        await SMTPSettings.sync();
        console.log('SMTP Settings synced');
    }catch(error){
        console.log('Error while trying to do the middleware sync function ! \r\n More info :',error);
    }
}