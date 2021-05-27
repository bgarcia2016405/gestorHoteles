'use strict'

const express = require("express");
var authenticated = require("../middlewares/authenticated");
const billController = require("../controllers/bill.controller");

var api = express.Router();

api.get('/generateBill/:idReservatio', billController.generate)
api.get('/showDetalle/:idBill', billController.showDetalle)



module.exports = api;