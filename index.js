const express = require('express');


const app = express();

const routes = require('./router.js');

const config = require('./utils/config.js');
// System Setup

 // ## Rendering Template Engine ## //


 const HANDLEBARS_CONFIG = require('./config/handlebarsConfig.js');

  // ## END Rendering Template Engine ## //


  // ## Express Config ## //

 const EXPRESSJS_CONFIG = require('./config/expressConfig.js');
const { databaseConnect } = require('./config/databaseConfig.js');
const { sync } = require('./database/sync.js');


 // ## End Express Config ## //


 // ## Routes Setup ## //

 HANDLEBARS_CONFIG(app);

 EXPRESSJS_CONFIG(app,express);

 (databaseConnect().then((response) => {
    console.log(response.message);
 }))

 app.use(routes);


 // ## End Routes Setup ## //
app.listen(config.getProperty('APP_PORT'), (req,res) => {
    sync();
    console.log('QuickMail Notification | Site is running on port :', config.getProperty('APP_PORT'));
});