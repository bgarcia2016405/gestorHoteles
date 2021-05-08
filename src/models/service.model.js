'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ServiceSchema =  Schema({
    hotel: {type: Schema.Types.ObjectId, ref:'Hotel'},
    service: String,
    price: Number
});

module.exports = mongoose.model('Service', ServiceSchema);