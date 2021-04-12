'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    typeEvent: {type: Schema.Types.ObjectId, ref:'TypeEvent'},
    date: Date,
    persons: Number
});

module.exports = mongoose.model('Event', EventSchema);
