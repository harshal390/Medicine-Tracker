const express = require('express');
const { addMedication, medicationList, deleteMedication } = require('../controllers/medication.controller');
const route = express.Router();


route.post("/add-medication", addMedication);
route.get("/medications-list", medicationList);
route.get("/delete-medication/:id", deleteMedication);

module.exports = route;