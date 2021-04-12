'use strict'

const app = require('./app');
const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const userModel = require('./src/models/user.model');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/GestorHoteles', {useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{

    var user = 'ADMIN';
    var password = '123456';
    var type = 'Administrador';
    var User = new userModel();

    User.user = user;
    User.type = type;

    userModel.find({ user : User.user }).exec((err,userFound)=>{
        if(userFound && userFound.length >= 1) return console.log("User exist");

        bcrypt.hash(password, null, null, (err, encryptedPasswords)=>{
            if(err) return console.log("password request error");

            User.password = encryptedPasswords;

            User.save((err,userSave)=>{
                if(err) return console.log("save user request error");

                if(userSave){
                    return console.log(userSave);
                }else{
                    return console.log("not save the user")
                }
            })
        })
    })

    app.listen(3000, function(){
    })

}).catch(err => console.log(err))