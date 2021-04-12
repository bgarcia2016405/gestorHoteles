'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const eventModel = require("../models/event.model");
const typeEventModel = require("../models/typeEvent.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';


/////////////////////////////MANAGER///////////////////////////////////
function create(req,res){
    var params = req.body;
    var validation = req.user.type;
    var EventModel = new eventModel();

    if(validation =! manager) return res.status(404).send({report: 'You are not Manager'});

    userModel.findById(params.cliente,(err,userFound)=>{
        
        if(err) return res.status(404).send({report:'Error in find user'});

        if(!userFound) return res.status(202).send({report:'User not exist'});

        typeEventModel.findById(params.tipoEvento ,(err,hotelFound)=>{

        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(202).send({report:'Hotel not exist'});

        EventModel.typeEvent = params.tipoEvento;
        EventModel.user = params.cliente;
        EventModel.persons = params.personas;
        EventModel.date = params.fecha;

        EventModel.save((err,eventSave)=>{

            if(err) return res.status(404).send({report: 'event requiest error'});

            if(!eventSave) return res.status(202).send({report: 'event dont save'});

            return res.status(200).send(eventSave);
        })
    })


    })
}


module.exports = {
    create
}