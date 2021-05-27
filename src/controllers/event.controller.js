'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const userModel = require("../models/user.model");
const eventModel = require("../models/event.model");
const typeEventModel = require("../models/typeEvent.model");
const { findByIdAndUpdate } = require('../models/user.model');

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

const fecha = new Date();
const t = 'true';
const f = 'false';


/////////////////////////////MANAGER///////////////////////////////////
function create(req,res){
    var params = req.body;
    var EventModel = new eventModel();


    eventModel.findOne({date:params.fecha, typeEvent: params.tipoEvento},(err,dateOcupate)=>{

        if(err) return res.status(404).send({report:'Error in find date'});

        if(dateOcupate) return res.status(200).send({report:'this date is busy'})

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
            EventModel.state = f;
    
            EventModel.save((err,eventSave)=>{
    
                if(err) return res.status(404).send({report: 'event requiest error'});
    
                if(!eventSave) return res.status(202).send({report: 'event dont save'});
               
    
                return res.status(200).send(eventSave);
            })
        })
    
    
        })
    })

}

function showEventHotel(req,res){
    var typoEvento = req.params.typoEvento;

    typeEventModel.find({name: typoEvento},(err, hotelFound)=>{
        if(err) return res.status(404).send({report: 'hotel requiest error'});
    
        if(!hotelFound) return res.status(202).send({report: 'hotel not have this event'});
       

        return res.status(200).send(hotelFound);

    }).populate('hotel')

}


function showEventDate(req,res){
    var eventoId = req.params.eventoId;

    
    eventModel.find({typeEvent:eventoId},(err,eventFound)=>{
        eventFound.forEach(element => {
            const reser = new Date(element.date);
            if(reser>fecha){
                
                eventModel.findByIdAndUpdate(element._id,{state:t},(err,eventTrue)=>{
                    
                })
            }

        });

       eventModel.find({state:t}, (err,evenTomorrow)=>{
        if(err) return res.status(404).send({report: 'hotel requiest error'});
    
        evenTomorrow.forEach(element=>{
            eventModel.findByIdAndUpdate(element._id,{state:f},(err,eventRestar)=>{

            })
        })

        return res.status(200).send(evenTomorrow);
       }) 

    })
}





module.exports = {
    create,
    showEventHotel,
    showEventDate

}