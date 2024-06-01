const express = require('express');
const route = express.Router();
const { getRegisterController, postRegisterController, getLoginController, postLoginController } = require('../controllers/auth.controller')

route.get('/register',getRegisterController);
route.post('/register',postRegisterController);
route.get('/login',getLoginController);
route.post('/login',postLoginController);

module.exports = route;