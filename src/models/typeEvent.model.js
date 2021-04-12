'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var typeEventSchema = Schema({
    name:String,
    price:Number,
    hotel: {type: Schema.Types.ObjectId, ref:'Hotel'}
});

module.exports = mongoose.model('TypeEvent', typeEventSchema);