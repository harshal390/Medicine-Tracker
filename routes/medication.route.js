const express = require('express');
const { addMedication,medicationList } = require('../controllers/medication.controller');
const route = express.Router();


route.post("/add-medication", addMedication);
route.get("/medications-list",medicationList);

module.exports = route;