'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const eventController = require("../controllers/event.controller");

var api = express.Router();

api.post('/createEvent', authenticated.ensureAuth, eventController.create);

api.get('/hotelEvento/:typoEvento',eventController.showEventHotel)

api.get('/showEventDate/:eventoId', authenticated.ensureAuth, eventController.showEventHotel)

module.exports = api;