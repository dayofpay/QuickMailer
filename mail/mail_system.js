const nodemailer = require('nodemailer');
const config = require('../utils/config');
const { createMailLog } = require('../services/mailServices');


exports.sendMail = async(server_data,sender_name, receivers, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        host: server_data.server_host,
        port: server_data.server_port,
        secure: true,
        auth: {
          user: server_data.server_username,
          pass: server_data.server_password,
        },
      });
    try{
        let MAIL_CONTENT = {};
    
        html === 1 ? await transporter.sendMail({
            from: `"${sender_name}" <${sender_name}>`, // sender address
            to: receivers,
            subject: subject,
            html: text,
          }) : await transporter.sendMail({
            from: `"${sender_name}" <${sender_name}>`, // sender address
            to: receivers, // list of receivers
            subject: subject, // Subject line
            text: text, // plain text body
          });
          // check if we should log the mail
          const LOG_MAIL = config.getProperty('INSERT_EMAIL_LOGS');
          if(LOG_MAIL === 'true'){
              MAIL_CONTENT = {
                template_used : subject,
                mail_status: 'SENT',
                email: receivers,
              }
              await createMailLog(MAIL_CONTENT);
          }
        return {hasError: false, message: 'Mail Sent Successfully'};
    }catch(error){
        console.log(error);
        const LOG_MAIL = config.getProperty('INSERT_EMAIL_LOGS');
        if(LOG_MAIL === 'true'){
            MAIL_CONTENT = {
              template_used : subject,
              mail_status: 'FAILED',
              email: receivers,
            }
            await createMailLog(MAIL_CONTENT);
        }
        return {hasError: true, message: 'Mail Sent Failed',errorData: error}
    }
    
}