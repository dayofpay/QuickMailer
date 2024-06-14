const router = require('express').Router();
const { sendMail } = require('../mail/mail_system');
const {
    createServer,
    deleteServerById,
    createTemplate,
    deleteTemplateById,
    getServerById
} = require('../services/apiServices');
const { getTemplateById } = require('../services/mailServices');

// Middleware for basic validation of required fields
const validateFields = (req, res, fields) => {
    for (const field of fields) {
        if (!req.body[field]) {
            return res.status(400).json({ hasError: true, errorData: `${field} is required` });
        }
    }
    return null; // No validation errors
};

router.post('/servers/create', async (req, res) => {
    const { server_name, server_host, server_port, server_username, server_password, server_from_email } = req.body;
    
    // Basic validation
    const validationError = validateFields(req, res, ['server_name', 'server_host', 'server_port', 'server_username', 'server_password', 'server_from_email']);
    if (validationError) {
        return validationError;
    }

    try {
        const CREATE_SERVER = await createServer(server_name, server_host, server_port, server_username, server_password, server_from_email);
        
        if (CREATE_SERVER.hasError) {
            return res.status(500).json({ hasError: true, message: 'Error creating server', errorData: CREATE_SERVER.errorData });
        }
        
        return res.status(200).json({ message: 'Server created successfully' });
    } catch (error) {
        console.error('Error creating server:', error);
        return res.status(500).json({ hasError: true, message: 'Server creation failed', errorData: error.message });
    }
});

router.delete('/servers/delete', async (req, res) => {
    const { server_id } = req.body;
    
    // Basic validation
    const validationError = validateFields(req, res, ['server_id']);
    if (validationError) {
        return validationError;
    }

    try {
        const deleteServer = await deleteServerById(server_id);
        
        if (deleteServer.hasError) {
            return res.status(500).json({ hasError: true, message: 'Error deleting server', errorData: deleteServer.errorData });
        }
        
        return res.status(200).json({ message: 'Server deleted successfully' });
    } catch (error) {
        console.error('Error deleting server:', error);
        return res.status(500).json({ hasError: true, message: 'Server deletion failed', errorData: error.message });
    }
});

router.post('/templates/create', async (req, res) => {
    const { template_name, template_subject, template_content, is_html } = req.body;
    
    // Basic validation
    const validationError = validateFields(req, res, ['template_name', 'template_subject', 'template_content']);
    if (validationError) {
        return validationError;
    }

    try {
        const CREATE_TEMPLATE = await createTemplate(template_name, template_subject, template_content, is_html);
        
        if (CREATE_TEMPLATE.hasError) {
            return res.status(500).json({ hasError: true, message: 'Error creating template', errorData: CREATE_TEMPLATE.errorData });
        }
        
        return res.status(200).json({ message: 'Template created successfully' });
    } catch (error) {
        console.error('Error creating template:', error);
        return res.status(500).json({ hasError: true, message: 'Template creation failed', errorData: error.message });
    }
});

router.delete('/templates/delete', async (req, res) => {
    const { template_id } = req.body;
    
    // Basic validation
    const validationError = validateFields(req, res, ['template_id']);
    if (validationError) {
        return validationError;
    }

    try {
        const deleteTemplate = await deleteTemplateById(template_id);
        
        if (deleteTemplate.hasError) {
            return res.status(500).json({ hasError: true, message: 'Error deleting template', errorData: deleteTemplate.errorData });
        }
        
        return res.status(200).json({ message: 'Template deleted successfully' });
    } catch (error) {
        console.error('Error deleting template:', error);
        return res.status(500).json({ hasError: true, message: 'Template deletion failed', errorData: error.message });
    }
});

router.post('/mails/send', async (req, res) => {
    const { receiver_email, template, server } = req.body;
    
    // Basic validation
    const validationError = validateFields(req, res, ['receiver_email', 'template', 'server']);
    if (validationError) {
        return validationError;
    }

    try {
        const templateData = (await getTemplateById(template)).data;
        const serverData = (await getServerById(server)).data;
        
        const SEND_EMAIL = await sendMail(serverData, serverData.server_from_email, receiver_email, templateData.template_subject, templateData.template_content, templateData.template_content_is_html);
        
        if (SEND_EMAIL.hasError) {
            return res.status(500).json({ hasError: true, message: 'Error sending email', errorData: SEND_EMAIL.errorData });
        }
        
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ hasError: true, message: 'Email sending failed', errorData: error.message });
    }
});

module.exports = router;
