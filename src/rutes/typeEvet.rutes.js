'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const typeEventController = require("../controllers/typeEvent.controller");

var api = express.Router();

api.post('/addTypeEvent', authenticated.ensureAuth, typeEventController.add);


module.exports = api;