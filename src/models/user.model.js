'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    user:String,
    password:String,
    type:String
})

module.exports = mongoose.model('User', UserSchema);

