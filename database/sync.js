const SMTPSettings = require('../models/SMTPSettings');
const MailTemplate = require('../models/Templates');
const MailHistory = require('../models/MailHistory');
const { getProperty } = require('../utils/config');

exports.sync = async () => {
    // Check if database syncing is enabled
    const SYNC_DB_ENABLED = getProperty('POPULATE_DEMO_DATA');

    if (SYNC_DB_ENABLED === 'true') {
        try {
            const SYNC_MODELS_LIST = {
                MODEL_SMTP_SETTINGS: {
                    model: SMTPSettings,
                    defaultData: {
                        server_id: 1,
                        server_name: 'Gmail',
                        server_host: 'smtp.gmail.com',
                        server_port: 465,
                        server_username: 'hello@example.com',
                        server_password: 'password',
                        server_from_email: 'hello@example.com',
                    }
                },
                MODEL_EMAIL_TEMPLATE: {
                    model: MailTemplate,
                    defaultData: {
                        template_id: 1,
                        template_name: 'Test Template',
                        template_subject: 'Test Subject',
                        template_content: 'Test Content',
                        template_content_is_html: false
                    }
                },
                MODEL_EMAIL_HISTORY: {
                    model: MailHistory,
                    defaultData: {
                        mail_id: 1,
                        template_used: 'Test Template',
                        mail_status: 'SENT',
                        email: 'test@example.com',
                    }
                }
            };

            // Sync each model and insert default data
            for (const key in SYNC_MODELS_LIST) {
                const { model, defaultData } = SYNC_MODELS_LIST[key];
                await model.sync();
                const hasData = await model.findOne({ where: { ...defaultData } });
                if (!hasData) {
                    await model.create(defaultData);
                }
                console.log(`${key} synced`);
            }

            console.log('All models synced successfully');
        } catch (error) {
            console.error('Error while trying to sync models:', error);
        }
    }
};
