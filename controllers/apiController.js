const { createServer } = require('../services/apiServices');

const router = require('express').Router();

router.post('/servers/create', async (req, res) => {
    const { server_name, server_host, server_port, server_username, server_password, server_from_email } = req.body;

    // Basic validation
    if (!server_name || !server_host || !server_port || !server_username || !server_password || !server_from_email) {
        return res.status(400).json({ hasError: true, errorData: 'All fields are required' });
    }


    const CREATE_SERVER = await createServer(server_name,server_host,server_port,server_username,server_password,server_from_email);
    return CREATE_SERVER.hasError === true ? 
    res.status(500).json({hasError:true, message: `There was error while trying to create server`,errorData: `${CREATE_SERVER.errorData}`}) 
     :     res.status(200).json({message: 'Server Created successfully'}) 
});

module.exports = router;
