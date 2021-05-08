'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ReservationSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    room: {type: Schema.Types.ObjectId, ref:'Room'},
    state: String,
    checkIn: String,
    checkOut: String,
    services: [{type: Schema.Types.ObjectId, ref:'Service'}]
})

module.exports = mongoose.model('Reservation', ReservationSchema);