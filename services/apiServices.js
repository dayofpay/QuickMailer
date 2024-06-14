const SMTP = require('../models/SMTPSettings');
const Templates = require('../models/Templates');
exports.createServer = async(server_name,server_host,server_port,server_username,server_password,server_from_email) => {
    const validations = [
        { field: server_name, message: 'Please specify server name' },
        { field: server_host, message: 'Please specify server host' },
        { field: server_port, message: 'Please specify server port' },
        { field: server_username, message: 'Please specify server username' },
        { field: server_password, message: 'Please specify server password' },
        { field: server_from_email, message: 'Please specify server from email' },
    ];

    for (const validation of validations) {
        if (!validation.field) {
            return { hasError: true, errorData: validation.message };
        }
    }
    try{
        await SMTP.create({server_name,server_host,server_port,server_username,server_password,server_from_email});
        return {hasError: false}
    }catch(error){
        return {hasError:true, errorData: error}
    }
}

exports.getServerList = async() => {
    return SMTP.findAll({raw:true});
}

exports.deleteServerById = async(id) => {
    try{
        await SMTP.destroy({where: {server_id: id}});

        return {hasError:false};
    }
    catch(error){
        return {hasError: true};
    }
}


exports.getTemplateList = async() => {
    try{
        const templateList = await Templates.findAll({raw:true});
        return {hasError:false, templateList};
    }catch(error){
        return {hasError:true, errorData:error};
    }
}

exports.createTemplate = async(template_name,template_subject,template_content,is_html) => {
    const validations = [
        { field: template_name, message: 'Please specify template name' },
        { field: template_subject, message: 'Please specify template subject' },
        { field: template_content, message: 'Please specify template content' },
    ];

    for (const validation of validations) {
        if (!validation.field) {
            return { hasError: true, errorData: validation.message };
        }
    }
    try{
        await Templates.create({template_name,template_subject,template_content,template_content_is_html: is_html});
        return {hasError: false}
    }catch(error){
        return {hasError:true, errorData: error}
    }
}
exports.deleteTemplateById = async(id) => {
    try{
        await Templates.destroy({where: {template_id: id}});

        return {hasError:false};
    }
    catch(error){
        return {hasError: true};
    }
}

exports.getServerById = async(id) => {
    try{
        const server = await SMTP.findOne({where: {server_id: id},raw:true});
        return {hasError:false, data:server};
    }catch(error){
        return {hasError:true, errorData:error};
    }
}