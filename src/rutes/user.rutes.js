'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const userController = require("../controllers/user.controller");

var api = express.Router();

api.post('/Login', userController.Login);

/////////////////////USUARIO/////////////////////////////////////////
api.post('/createUser', userController.createUser);

api.put('/editUser', authenticated.ensureAuth, userController.editUser);

api.delete('/dropUser', authenticated.ensureAuth, userController.dropUser);

api.get('/showUserId/:idUsuario', userController.findUserId)

///////////////////GERENTEHOTEL//////////////////////////////////////

api.get('/userManager', userController.findUserManager);

///////////////////ADMINISTRADOR//////////////////////////////////////
api.get('/showAllUser', authenticated.ensureAuth, userController.showAllUsers)

module.exports = api;