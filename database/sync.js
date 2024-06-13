
const SMTPSettings = require('../models/SMTPSettings');
const MailTemplate = require('../models/Templates');
const MailHistory = require('../models/MailHistory');
exports.sync = async() => {
    try{

        const SYNC_MODELS_LIST = {
            MODEL_SMTP_SETTINGS : SMTPSettings,
            MODEL_EMAIL_TEMPLATE : MailTemplate,
            MODEL_EMAIL_HISTORY : MailHistory,
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

        // Define testing email template
        const hasTemplate = await MailTemplate.findOne({where : {template_id : 1}});
        if(hasTemplate === null){
            MailTemplate.create({
                template_id : 1,
                template_name : 'Test Template',
                template_subject : 'Test Subject',
                template_content : 'Test Content',
                template_content_is_html : false
            })
        }
        await MailTemplate.sync();
        console.log('Email Template synced');

        // Define testing email
        const hasMail = await MailHistory.findOne({where : {mail_id : 1}});
        if(hasMail === null){
            MailHistory.create({
                mail_id : 1,
                template_used : 'Test Template',
                mail_status : 'SENT',
                email : 'test@example.com',
            })
        }
        await MailHistory.sync();
        console.log('Email History synced');
    }catch(error){
        console.log('Error while trying to do the middleware sync function ! \r\n More info :',error);
    }
}