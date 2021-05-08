'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const serviceController = require("../controllers/service.controller");

var api = express.Router();

api.post('/createService',  authenticated.ensureAuth, serviceController.add);

api.put('/addService/:idReservation/:idService', authenticated.ensureAuth, serviceController.serviceReservation);


module.exports = api;