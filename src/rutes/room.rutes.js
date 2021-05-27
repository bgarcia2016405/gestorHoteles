'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const roomController = require("../controllers/room.controller");

var api = express.Router();

api.post('/addRoom/:idHotel', authenticated.ensureAuth, roomController.add);
api.get('/showRoomHotel/:IDhotel', authenticated.ensureAuth, roomController.showRoomHotel);
api.get('/showId/:idRoom', roomController.showId)
api.put('/editarRoom/:idRoom', roomController.editar)
api.delete('/eliminarRoom/:idRoom', roomController.eliminar)
api.post('/searchRoomDate', roomController.searchRoomDate)
api.get('/showReservationRoom/:idRoom', roomController.showReservationRoom)


module.exports = api;