const homeController = require('./homeController');
const settingsController = require('./settingsController');
const apiController = require('../controllers/apiController');
const composeController = require('../controllers/composeController');
const controllerList = {
    HOME_CONTROLLER: homeController,
    SETTINGS_CONTROLLER: settingsController,
    API_CONTROLLER: apiController,
    COMPOSE_CONTROLLER: composeController,
};
module.exports = controllerList;