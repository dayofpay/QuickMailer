const siteSettings = {};
const dotenv = require('dotenv').config({processEnv:siteSettings});

exports.getConfig = () => {
    return siteSettings;
}

exports.hasProperty = (key) => {

    return siteSettings.hasOwnProperty(key);
}

exports.equals = (property,key) => {
    return siteSettings[property] === key;
}

exports.getProperty = (propertyName) => {
    return siteSettings?.[propertyName];
}