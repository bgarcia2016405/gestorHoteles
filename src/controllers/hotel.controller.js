'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const hotelModel = require("../models/hotel.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

////////////////////////USER//////////////////////////////////////////
function showHotels(req,res){
    hotelModel.find((err,hotelsFound)=>{
        if(err) return res.status(404).send({report: 'Error in find hotels'});
        if(!hotelsFound) return res.status(404).send({report: 'No Data'});
        return res.status(200).send(hotelsFound);
    })
}

///////////////////////MANAGER//////////////////////////////////////
function create(req,res){
    var params = req.body;
    var validation = req.user.type;
    var HotelModel = new hotelModel();

    if(validation != admin) return res.status(404).send({report: 'You are not Admin'});


    hotelModel.findOne({ name: params.nombre}, (err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find Hotel'});

        if(hotelFound) return res.status(200).send({report:'Hotel name exist'});

        HotelModel.name = params.name;
        HotelModel.star = params.star;
        HotelModel.manager = params.manager;
        HotelModel.imagen = params.imagen;
        HotelModel.contry = params.contry;
        HotelModel.city = params.city;
        HotelModel.direction = params.direction;


        
        userModel.findById(params.manager,(err,userFound)=>{
            if(err) return res.status(404).send({report:'Error in find user'});
            
            if(userFound.type == manager) return res.status(404).send({report:'User is alredy manager'})
            
            userModel.findByIdAndUpdate(params.manager, {type:manager} ,(err,managerCreate)=>{
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

function showHotel(req,res){
    var idManager = req.user.sub

   
        hotelModel.findOne({manager:idManager}, (err,hotelFound) => {
            if(err) return res.status(404).send({report: 'Erro in find hotel'});
            if(!hotelFound) return res.status(200).send({report: 'hotel not found'})
            return res.status(200).send(hotelFound)
        })
    
}

module.exports ={
    create,
    showHotels,
    showHotel
}