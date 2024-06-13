const SMTP = require('../models/SMTPSettings');
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
        await SMTP.create(server_name,server_host,server_port,server_username,server_password,server_from_email);
        return {hasError: false}
    }catch(error){
        return {hasError:true, errorData: error}
    }
}