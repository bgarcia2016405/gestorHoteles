'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const reservationModel = require("../models/reservation.model");
const hotelModel = require("../models/hotel.model");
const roomModel = require("../models/room.model");


const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';


///////////////////////USUARIO//////////////////////////////////////
function reservation(req,res){
    var params = req.body;
    var user = req.user.sub;
    var ReservationModel = new reservationModel();

    roomModel.findById(params.Cuarto, (err,roomFound)=>{
        
        if(err) return res.status(404).send({report:'Error in find Room'});

        if(!roomFound) return res.status(200).send({report:'Room not exist'});

        ReservationModel.user = user;
        ReservationModel.room = params.Cuarto;
        ReservationModel.checkIn = params.Entrada;
        ReservationModel.checkOut = params.Salida;

       //////////// cumpleanos = new Date(params.Entrada);
         ///////////////////////////////////////////////////////////////////////
       //////// return console.log( 'Para el frontent resolver la fecha'  );
        
        ReservationModel.save((err,reservationSave)=>{
            if(err) return res.status(404).send({report: 'reservation requiest error'});
        
            if(!reservationSave) return res.status(202).send({report: 'reservation dont save'});

            return res.status(200).send(reservationSave);
        })
    })
}

///////////////////////MANAGER//////////////////////////////////////
function showReservation(req,res){
    var user = req.user.sub;
    var validation = req.user.type;

    if(validation != manager) return res.status(400).sedn({report:'You are not manager'});

    hotelModel.findOne({manager:user}, (err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(402).sedn({report:'Hotel not exist'});

        roomModel.find({hotel:hotelFound._id},(err,roomFound)=>{
            if(err) return res.status(404).send({report:'Error in find room'});

            if(roomFound == '') return res.status(402).send({report:'Rooms not exist'});

            roomFound.forEach((showId)=>{

                reservationModel.find({room:showId._id}, (err,reservationFound)=>{
                    if(err) return res.status(404).send({report:'Error in show reservations'});

                    if(!reservationFound) return res.status(404).send({report:'Reservation not Found'})
                    
                    return res.status(200).send(reservationFound)
                })
            })
            
        })

       
    })
}

module.exports = {
    showReservation,
    reservation
}