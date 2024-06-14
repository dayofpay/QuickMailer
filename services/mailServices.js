exports.getLatestMailHistory = async () => {
    const MailHistory = require('../models/MailHistory');
    let mailData = null;
    try{
        mailData = await MailHistory.findAll({
            order: [
                ['mail_id', 'DESC'],
            ],
            raw: true
        });
        }catch(e){
            mailData = null;
    }
    return mailData === null ? {hasError:true} : {hasError:false, data:mailData};
}

exports.getTemplateById = async(template_id) => {
    const Template = require('../models/Templates');
    let templateData = null;
    try{
        templateData = await Template.findOne({
            where: {
                template_id: template_id
            },
            raw: true
        });
        }
        catch(e){
            templateData = null;
        }
    return templateData === null ? {hasError:true} : {hasError:false, data:templateData};
}

exports.createMailLog = async (mailData) => {
    const MailHistory = require('../models/MailHistory');
    try{
        await MailHistory.create(mailData);
        return {hasError:false};
    }catch(e){
        return {hasError:true};
    }
}