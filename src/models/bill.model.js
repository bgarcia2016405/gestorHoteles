'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BillSchema = Schema({
    reservacion: {type: Schema.Types.ObjectId, ref:'Reservation'},
    days: Number,
    total: Number,
})

module.exports = mongoose.model('Bill', BillSchema);
