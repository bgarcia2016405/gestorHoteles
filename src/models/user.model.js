'use strict'

const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
    lastName: String,
    password:String,
    email:String,
    name:String,
    user:String,
    type:String,
    age:String

    //poner muchos más datos personales para el usuario en general.
})

module.exports = mongoose.model('User', UserSchema);

