'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

function Login(req,res){
    var params = req.body;
    
    userModel.findOne({ user : params.usuario }, (err, userFound)=>{
        if(err) return res.status(404).send({ report: 'Error at Login'});

        if(!userFound) return res.status(404).send({ report: 'user dosent exist'});

        if(userFound){

            bcrypt.compare(params.password, userFound.password, (err,Valid)=>{

                if(err) return res.status(404).send({ report : 'Error in password'});

                 if(Valid) {

                     return res.status(200).send({ token: jwt.createToken(userFound)}  );
                
                 }else {

                    return res.status(404).send({ report: 'The user its not valid'})
                    
                 }
             })
        }
    })

}

////////////////////////////USUARIO////////////////////////////////////////////////////////

function createUser(req,res){
    var params = req.body;
    var UserModel = new userModel();

    delete params.rol

    if(params.nombre && params.password){
        userModel.findOne({ user : params.nombre}).exec((err,userFound)=>{

            if(err) return res.status(404).send({report: 'Error in find user'});

            if(userFound){
                return res.status(202).send({report: 'user exist'});
            
            }else{
                UserModel.user = params.nombre;
                UserModel.type = user;
                bcrypt.hash(params.password, null, null, (err, encryptedPassword)=>{

                    if(err) return res.status(404).send({report: 'password request error'});

                    if(!encryptedPassword) return res.status(202).send({report: 'password dont encrypted'})

                    UserModel.password = encryptedPassword;

                    UserModel.save((err, userSave)=>{
                        if(err) return res.status(404).send({report: 'user resquest error'});

                        if(!userSave) return res.status(202).send({report: 'user dont save'});

                        return res.status(200).send(userSave)
                    })
                })
            }

        })
    }else{
        return res.status(404).send({report: 'unfilled data'})
    }
}

function editUser(req,res){
    var params = req.body;
    var validation = req.user.type;
    var user = req.user.sub;

    if(validation != user) return res.status(400).send({report:'You not are user'});

    

}

////////////////////////////MANAGER////////////////////////////////////////////////////////  


////////////////////////////ADMINISTRADOR/////////////////////////////////////////////////

function showAllUsers(req,res){
    var validation = req.user.type;

    if(validation == admin){
        userModel.find((err,userFound)=>{
            if(err) return res.status(404).send({report: 'Error in find users'});

            return res.status(200).send(userFound);
        })
    }else{
        return res.status(404).send({report:"You are not Admin"})
    }
}
module.exports = {
    Login,
    createUser,
    showAllUsers,
    editUser
}