const express = require('express');
const route = express.Router();
const { getRegisterController, postRegisterController, getLoginController, postLoginController, logoutFromCurrentDevice } = require('../controllers/auth.controller')

route.get('/register', getRegisterController);
route.post('/register', postRegisterController);
route.get('/login', getLoginController);
route.post('/login', postLoginController);
route.get('/logout-current-device', logoutFromCurrentDevice);

module.exports = route;