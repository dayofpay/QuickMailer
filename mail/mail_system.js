const nodemailer = require('nodemailer');
const config = require('../utils/config');
const { createMailLog } = require('../services/mailServices');

exports.sendMail = async (serverData, senderName, receivers, subject, text, html) => {
    const transporter = nodemailer.createTransport({
        host: serverData.server_host,
        port: serverData.server_port,
        secure: true,
        auth: {
            user: serverData.server_username,
            pass: serverData.server_password,
        },
    });

    try {
        let mailOptions = {
            from: `"${senderName}" <${senderName}>`,
            to: receivers,
            subject: subject,
        };

        if (html) {
            mailOptions.html = text;
        } else {
            mailOptions.text = text;
        }

        // Send mail using transporter
        await transporter.sendMail(mailOptions);

        // Log the mail if logging is enabled
        const logMail = config.getProperty('INSERT_EMAIL_LOGS') === 'true';
        if (logMail) {
            const mailLog = {
                template_used: subject,
                mail_status: 'SENT',
                email: receivers,
            };
            await createMailLog(mailLog);
        }

        return { hasError: false, message: 'Mail Sent Successfully' };
    } catch (error) {
        console.error('Error sending email:', error);

        // Log the mail failure if logging is enabled
        const logMail = config.getProperty('INSERT_EMAIL_LOGS') === 'true';
        if (logMail) {
            const mailLog = {
                template_used: subject,
                mail_status: 'FAILED',
                email: receivers,
            };
            await createMailLog(mailLog);
        }

        return { hasError: true, message: 'Mail Sent Failed', errorData: error };
    }
};
