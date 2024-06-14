const router = require('express').Router();


const controllerList = require('./controllers/controllerList');

router.use(controllerList.HOME_CONTROLLER);
router.use('/settings',controllerList.SETTINGS_CONTROLLER);
router.use('/api',controllerList.API_CONTROLLER);
router.use('/compose',controllerList.COMPOSE_CONTROLLER);
console.log('Router Configured');
module.exports = router;