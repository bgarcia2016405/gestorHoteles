'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const hotelModel = require("../models/hotel.model");
const roomModel = require("../models/room.model");
const serviceModel = require("../models/service.model");
const eventModel = require("../models/event.model");
const typeEvent = require("../models/typeEvent.model")
const reservationModel = require("../models/reservation.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

const reservate = 'Reservado';
const curso = 'Curso';
const terminado = 'Finalizado';

////////////////////////USER//////////////////////////////////////////
function showHotels(req,res){
    hotelModel.find((err,hotelsFound)=>{
        if(err) return res.status(404).send({report: 'Error in find hotels'});
        if(!hotelsFound) return res.status(404).send({report: 'No Data'});
        return res.status(200).send(hotelsFound);
    })
}

///////////////////////ADMINISTRADOR//////////////////////////////////////
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

function edit(req,res){
    var params = req.body;
    var validation = req.user.type;
    var idHotel = req.params.idHotel;
   

    if(validation != admin) return res.status(404).send({report: 'You are not Admin'});

    hotelModel.findByIdAndUpdate(idHotel, params, (err,hotelEdit)=>{
        if(err) return res.status(404).send({report: 'Erro in find hotel'});
            if(!hotelEdit) return res.status(200).send({report: 'hotel not edit'})
            return res.status(200).send(hotelEdit)
    })

}

function drop(req,res){
    var validation = req.user.type;
    var idHotel = req.params.idHotel;

    if(validation != admin) return res.status(404).send({report: 'You are not Admin'});

   

hotelModel.findByIdAndDelete(idHotel,(err,hotelDrop)=>{
    if(err) return res.status(404).send({report: 'Error in find hotel'});
    if(!hotelDrop) return res.status(200).send({report: 'hotel not drop'})
    

    serviceModel.find({hotel:idHotel}, (err,service)=>{
        serviceModel.deleteMany(service, (err,serviceDrop)=>{
            console.log(serviceDrop)

            typeEvent.find({hotel:idHotel},(err,typeEventFound)=>{
                typeEvent.deleteMany(typeEventFound,(err,typeEventDrop)=>{
                    console.log(typeEventDrop)
                    })
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

function hotel(req,res){
    var idHotel = req.params.idHotel

    hotelModel.findById(idHotel, (err,hotelFound) => {
        if(err) return res.status(404).send({report: 'Erro in find hotel'});
        if(!hotelFound) return res.status(200).send({report: 'hotel not found'})
        return res.status(200).send(hotelFound)
    })
}



function reportHotel(req,res){
     hotelModel.find( (err,hotelFound) => {
         return res.status(200).send(hotelFound)
     }).sort({stack:-1})
}

function findHotelName(req,res){
    var params = req.body
   
    hotelModel.findOne( { $or: [{name:{$regex:params.name, $options:'i'}} ,{direction:{$regex:params.name, $options:'i'}}] }, (err,hotelFound) => {
        if(err) return res.status(404).send({report: 'Erro in find hotel'});
        if(!hotelFound) return res.status(200).send({report: 'hotel not found'})
        return res.status(200).send(hotelFound)
    })
}

module.exports ={
    create,
    showHotels,
    showHotel,
    hotel, 
    edit,
    drop,
    reportHotel,
    findHotelName
}