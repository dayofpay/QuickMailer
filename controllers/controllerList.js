const homeController = require('./homeController');
const settingsController = require('./settingsController');
const apiController = require('../controllers/apiController');
const controllerList = {
    HOME_CONTROLLER: homeController,
    SETTINGS_CONTROLLER: settingsController,
    API_CONTROLLER: apiController,
};
module.exports = controllerList;