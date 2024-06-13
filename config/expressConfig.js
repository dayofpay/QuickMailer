const path = require('path');
const cookieParse = require("cookie-parser");
const { requireSmtpSetup } = require('../middlewares/smtpSetup');

const cors = require('cors');

const expressConfig = (app, express) => {
    app.use(express.static(path.resolve(__dirname, '../public')));
    app.use(express.json());
    

    app.use(express.urlencoded({ extended: true, limit: '50mb' }));

    app.use(cookieParse());
    app.use(requireSmtpSetup);
    app.use(cors());
}

module.exports = expressConfig;
