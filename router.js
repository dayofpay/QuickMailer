const router = require('express').Router();


const controllerList = require('./controllers/controllerList');

router.use(controllerList.HOME_CONTROLLER);
console.log('Router Configured');
module.exports = router;