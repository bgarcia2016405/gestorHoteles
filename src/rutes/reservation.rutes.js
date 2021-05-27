'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const reservationControllor = require("../controllers/reservation.controller");

var api = express.Router();

api.post('/reservation/:roomID', authenticated.ensureAuth, reservationControllor.reservation);

api.get('/showReservation', authenticated.ensureAuth, reservationControllor.showReservation);

api.get('/showMyReservation', authenticated.ensureAuth, reservationControllor.showMyReservation);

api.put('/cancelReservation/:idReservation',  reservationControllor.Cancelar);

api.get('/verficar', reservationControllor.verfirvar)

module.exports = api;
