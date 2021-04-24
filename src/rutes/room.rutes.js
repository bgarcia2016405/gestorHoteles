'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const roomController = require("../controllers/room.controller");

var api = express.Router();

api.post('/addRoom', authenticated.ensureAuth, roomController.add);
api.get('/showRoomHotel/:IDhotel', authenticated.ensureAuth, roomController.showRoomHotel);



module.exports = api;