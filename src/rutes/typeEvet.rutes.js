'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const typeEventController = require("../controllers/typeEvent.controller");

var api = express.Router();

api.post('/addTypeEvent', authenticated.ensureAuth, typeEventController.add);
api.get('/showEventsHotel/:IDhotel', authenticated.ensureAuth, typeEventController.showEventsHotel)
api.delete('/dropEventsHotel/:idTypoServicio', authenticated.ensureAuth, typeEventController.drop)
api.put('/editEventsHotel/:idTypoServicio', authenticated.ensureAuth, typeEventController.edit)
api.get('/showTypeEvent/:idTypoServicio', typeEventController.show)

module.exports = api;