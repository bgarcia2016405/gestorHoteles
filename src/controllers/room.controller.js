'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const roomModel = require("../models/room.model");
const hotelModel = require("../models/hotel.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

///////////////////////ADMINISTRIDOR//////////////////////////////////////
function add(req,res){
    var params = req.body;
    var validation = req.user.type;
    var RoomModel = new roomModel();

    if(validation =! admin) return res.status(404).send({report: 'You are not Admin'});

    hotelModel.findById(params.hotel, (err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(2020).send({report:'Hotel not exist'});

    RoomModel.beds = params.camas;
    RoomModel.hotel = params.hotel;
    RoomModel.price = params.presio;
    RoomModel.persons = params.personas;
    RoomModel.description = params.descripcion;

        RoomModel.save((err,roomSave)=>{
            if(err) return res.status(404).send({report: 'room requiest error'});

            if(!roomSave) return res.status(202).send({report: 'room dont save'});

            return res.status(200).send(roomSave);
        })

    })
    
}

/////////////////////////Usuario////////////////////////////////////////////
function showRoomHotel(req,res){
    var IDhotel = req.params.IDhotel;

    roomModel.find({hotel:IDhotel},(err,roomsFound)=>{
        if(err) return res.status(404).send({report:'Error find rooms'});

        if(!roomsFound) return res.status(200).send({report:'Hotel rooms not exist'});

        return res.status(202).send(roomsFound);
    })
}

module.exports = {
    add,
    showRoomHotel
}