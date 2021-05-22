'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const serviceController = require("../controllers/service.controller");

var api = express.Router();

api.post('/createService',  authenticated.ensureAuth, serviceController.add);

api.put('/addService/:idReservation/:idService', authenticated.ensureAuth, serviceController.serviceReservation);

api.get('/showServiceHotel',authenticated.ensureAuth, serviceController.showServiceHotel)

api.get('/showService/:idHotel', authenticated.ensureAuth, serviceController.showService)

api.get('/showServiceId/:idService', serviceController.showId)

api.put('/editService/:idService', authenticated.ensureAuth, serviceController.editService)

api.delete('/dropService/:idService', authenticated.ensureAuth, serviceController.dropService)

module.exports = api;