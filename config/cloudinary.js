const config = require('./env');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: config.cloud_name,
    api_key: config.cloudinary_api,
    api_secret: config.cloudinary_secret
});
module.exports = { cloudinary };