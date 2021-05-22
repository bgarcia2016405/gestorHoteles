'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const hotelController = require("../controllers/hotel.controller");

var api = express.Router();

api.post('/createHotel', authenticated.ensureAuth ,hotelController.create)

api.get('/showHotels', hotelController.showHotels);

api.get('/showHotel', authenticated.ensureAuth, hotelController.showHotel)

module.exports = api;