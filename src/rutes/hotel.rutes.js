'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const hotelController = require("../controllers/hotel.controller");

var api = express.Router();

api.post('/createHotel', authenticated.ensureAuth ,hotelController.create)



module.exports = api;