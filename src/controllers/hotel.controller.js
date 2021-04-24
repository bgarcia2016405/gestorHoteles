'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const hotelModel = require("../models/hotel.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';


///////////////////////MANAGER//////////////////////////////////////
function create(req,res){
    var params = req.body;
    var validation = req.user.type;
    var HotelModel = new hotelModel();

    if(validation =! admin) return res.status(404).send({report: 'You are not Admin'});

    hotelModel.findOne({ name: params.nombre}, (err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find Hotel'});

        if(hotelFound) return res.status(200).send({report:'Hotel name exist'});

        HotelModel.name = params.nombre;
        HotelModel.star = params.estrellas;
        HotelModel.manager = params.gerente;
        HotelModel.direction = params.direccion;

        userModel.findById(params.gerente,(err,userFound)=>{
            if(err) return res.status(404).send({report:'Error in find user'});

            if(userFound.type == manager) return res.status(404).send({report:'User is alredy manager'})

            userModel.findByIdAndUpdate(params.gerente, {type:manager} ,(err,managerCreate)=>{
                if(err) return res.status(404).send({report:'Error in find user'});
    
                if(!managerCreate) return res.status(202).send({report:'User not exist'})
    
                HotelModel.save((err,hotelSave)=>{
                    if(err) return res.status(404).send({report: 'hotel requiest error'});
        
                    if(!hotelSave) return res.status(202).send({report: 'hotel dont save'});
        
                    return res.status(200).send(hotelSave);
                })
    
            })
        })

    })
}

module.exports ={
    create
}