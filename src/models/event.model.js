'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var EventSchema = Schema({
    user: {type: Schema.Types.ObjectId, ref:'User'},
    typeEvent: {type: Schema.Types.ObjectId, ref:'TypeEvent'},
    date: String,
    persons: Number,
    state:String
});

module.exports = mongoose.model('Event', EventSchema);
