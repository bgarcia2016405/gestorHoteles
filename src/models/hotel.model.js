'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    name:String,
    star: Number,
    stack: Number,
    cancel: Number,
    city: String,
    direction:String,
    imagen:String,
    manager: {type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Hotel', HotelSchema);

