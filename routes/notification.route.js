const express = require("express");
const { notificationController } = require("../controllers/notification.controller");
const route = express.Router();


route.get("/notification/:id", notificationController);

module.exports = route;