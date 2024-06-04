const express = require('express');
const { addMedication } = require('../controllers/medication.controller');
const route = express.Router();


route.post("/add-medication", addMedication);

module.exports = route;