'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const reservationControllor = require("../controllers/reservation.controller");

var api = express.Router();

api.post('/reservation', authenticated.ensureAuth, reservationControllor.reservation);


module.exports = api;