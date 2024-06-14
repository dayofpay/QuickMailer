const { sendMail } = require('../mail/mail_system');
const { createServer, deleteServerById, createTemplate, deleteTemplateById, getServerById } = require('../services/apiServices');
const { getTemplateById } = require('../services/mailServices');

const router = require('express').Router();

router.post('/servers/create', async (req, res) => {
    const { server_name, server_host, server_port, server_username, server_password, server_from_email } = req.body;
    console.log(req.body);
    // Basic validation
    if (!server_name || !server_host || !server_port || !server_username || !server_password || !server_from_email) {
        return res.status(400).json({ hasError: true, errorData: 'All fields are required' });
    }


    const CREATE_SERVER = await createServer(server_name,server_host,server_port,server_username,server_password,server_from_email);
    return CREATE_SERVER.hasError === true ? 
    res.status(500).json({hasError:true, message: `There was error while trying to create server`,errorData: `${CREATE_SERVER.errorData}`}) 
     :     res.status(200).json({message: 'Server Created successfully'}) 
});
router.delete('/servers/delete', async (req, res) => {
    const { server_id } = req.body;

    if (!server_id) {
        return res.status(400).json({ hasError: true, errorData: 'Server ID is required' });
    }
    const deleteServer = await deleteServerById(server_id);
    return deleteServer.hasError === false ? res.status(200).json({ hasError: false, message: 'Server deleted successfully' }) :res.status(500).json({ hasError: true, errorData: 'An error occurred while deleting the server' }); ;
});
router.post('/templates/create',async(req,res) => {
    const { template_name, template_subject, template_content,is_html } = req.body;
    // Basic validation
    if (!template_name || !template_subject || !template_content) {
        return res.status(400).json({ hasError: true, errorData: 'All fields are required' });
    }
    const CREATE_TEMPLATE = createTemplate(template_name,template_subject,template_content,is_html);
    if(CREATE_TEMPLATE.hasError === true){
        return res.status(500).json({hasError:true, message: `There was error while trying to create template`,errorData: `${CREATE_TEMPLATE.errorData}`})
    }
    return res.status(200).json({message: 'Template Created successfully'})
})
router.delete('/templates/delete', async (req, res) => {
    const { template_id } = req.body;

    if (!template_id) {
        return res.status(400).json({ hasError: true, errorData: 'Template ID is required' });
    }
    const deleteTemplate = await deleteTemplateById(template_id);
    return deleteTemplate.hasError === false ? res.status(200).json({ hasError: false, message: 'Template deleted successfully' }) :res.status(500).json({ hasError: true, errorData: 'An error occurred while deleting the template' }); ;
});



router.post('/mails/send', async (req, res) => {
    // Parse the mail data
    const {receiver_email,template,server} = req.body;

    // parse the mail data from the server

    const template_data = (await getTemplateById(template)).data;

    const server_data = (await getServerById(server)).data;

    const SEND_EMAIL = await sendMail(server_data,server_data.server_from_email,receiver_email,template_data.template_subject,template_data.template_content,template_data.template_content_is_html);
    if(SEND_EMAIL.hasError === true){
        return res.status(500).json({hasError:true, message: `There was error while trying to send email`,errorData: `${SEND_EMAIL.errorData}`})
    }
    return res.status(200).json({message: 'Email Sent successfully'})

});
module.exports = router;
