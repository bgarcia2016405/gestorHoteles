'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const hotelController = require("../controllers/hotel.controller");

var api = express.Router();

api.post('/createHotel', authenticated.ensureAuth ,hotelController.create)

api.get('/showHotels', hotelController.showHotels);

api.get('/showHotel', authenticated.ensureAuth, hotelController.showHotel)

api.get('/hotel/:idHotel', hotelController.hotel)

api.put('/editHotel/:idHotel', authenticated.ensureAuth, hotelController.edit)

api.delete('/eliminarHotel/:idHotel', authenticated.ensureAuth, hotelController.drop)

api.get('/report',hotelController.reportHotel)

api.post('/hotelName', hotelController.findHotelName)

module.exports = api;