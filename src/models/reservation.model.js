'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservationSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    room: {type: Schema.Types.ObjectId, ref:'Room'},
    checkIn: String,
    checkOut: String 
})

module.exports = mongoose.model('Reservation', ReservationSchema);