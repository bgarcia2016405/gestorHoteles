'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const reservationModel = require("../models/reservation.model");
const roomModel = require("../models/room.model");


const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';


///////////////////////USUARIO//////////////////////////////////////
function reservation(req,res){
    var params = req.body;
    var user = req.user.sub;
    var validation = req.user.type;
    var ReservationModel = new reservationModel();

    roomModel.findById(params.Cuarto, (err,roomFound)=>{
        
        if(err) return res.status(404).send({report:'Error in find Room'});

        if(!roomFound) return res.status(200).send({report:'Room not exist'});

        ReservationModel.user = user;
        ReservationModel.room = params.Cuarto;
        ReservationModel.checkIn = params.Entrada;
        ReservationModel.checkOut = params.Salida;
        
        ReservationModel.save((err,reservationSave)=>{
            if(err) return res.status(404).send({report: 'reservation requiest error'});
        
            if(!reservationSave) return res.status(202).send({report: 'reservation dont save'});

            return res.status(200).send(reservationSave);
        })
    })
}


module.exports = {
    reservation
}