'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");

var api = express.Router();

api.post('/Login', userController.Login);

/////////////////////USUARIO/////////////////////////////////////////
api.post('/createUser', userController.createUser);




///////////////////GERENTEHOTEL//////////////////////////////////////


///////////////////ADMINISTRADOR//////////////////////////////////////
api.get('/showAllUser', authenticated.ensureAuth, userController.showAllUsers)

module.exports = api;