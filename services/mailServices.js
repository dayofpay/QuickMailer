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