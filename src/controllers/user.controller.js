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

                     return res.status(200).send({ token: jwt.createToken(userFound), userFound}  );
                
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

    if(params.Usuario && params.password){
        userModel.findOne({ user : params.Usuario}).exec((err,userFound)=>{

            if(err) return res.status(404).send({report: 'Error in find user'});

            if(userFound){
                return res.status(202).send({report: 'user exist'});
            
            }else{
                UserModel.user = params.Usuario;
                UserModel.lastName = params.Apellido;
                UserModel.name = params.nombre;
                UserModel.age = params.Edad;
                UserModel.email = params.correo;
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
    var user = req.user.sub;

    userModel.findById(user, params,{new: true, useFindAndModify:false} ,(err,userEdit)=>{
        if(err) return res.status(404).send({report:"Error in edit user"});

        if(!userEdit) return res.status(200).send({report:"User has not edit"});

        return res.status(200).send(userEdit)
    }) 
}

function dropUser(req,res){
    var user = req.user.sub;
    userModel.findByIdAndDelete(user, (err,UserDrop)=>{
        if(err) return res.status(404).send({report:'Error in delete product'});

        if(!UserDrop) return res.status(402).send({report:'User dont exist'});

        return res.status(200).send(UserDrop);
    })
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
    showAllUsers,
    createUser,
    dropUser,
    editUser,
    Login

}