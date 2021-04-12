'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var HotelSchema = Schema({
    name:String,
    direction:String,
    manager: {type: Schema.Types.ObjectId, ref:'User'}
})

module.exports = mongoose.model('Hotel', HotelSchema);

