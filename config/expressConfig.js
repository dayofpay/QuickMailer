const path = require('path');
const cookieParse = require("cookie-parser");
const bodyParser = require('body-parser');
const cors = require('cors');

const expressConfig = (app, express) => {
    app.use(express.static(path.resolve(__dirname, '../public')));
    

    app.use(express.json({ limit: '50mb' }));
    

    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

    app.use(cookieParse());
    app.use(cors());

    console.info('[INFO] ExpressJS Configured');
}

module.exports = expressConfig;
