'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var RoomSchema = Schema({
    hotel: {type: Schema.Types.ObjectId, ref:'Hotel'},
    beds: Number,
    persons: Number,
    price: Number,
    state: String
});

module.exports = mongoose.model('Room', RoomSchema);