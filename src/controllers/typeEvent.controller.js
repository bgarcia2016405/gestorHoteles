'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const hotelModel = require("../models/hotel.model");
const typeEventModel = require("../models/typeEvent.model");
const { model } = require('mongoose');

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

///////////////////////MANAGER//////////////////////////////////////

function add(req,res){
    var params = req.body;
    var validation = req.user.type;
    var TypeEventModel = new typeEventModel();

    if(validation =! manager) return res.status(404).send({report: 'You are not Manager'});
   
    hotelModel.findOne({manager:req.user.sub},(err,hotelFound)=>{
        
        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(202).send({report:'Hotel not exist'});

        TypeEventModel.name = params.evento;
        TypeEventModel.price = params.precio;
        TypeEventModel.hotel = hotelFound._id;

        TypeEventModel.save((err,typeEventSave)=>{

            if(err) return res.status(404).send({report: 'type event requiest error'});

            if(!typeEventSave) return res.status(202).send({report: 'type event dont save'});

            return res.status(200).send(typeEventSave);

        });

    });

}

///////////////////////USER//////////////////////////////////////
function showEventsHotel(req,res){
    var IDhotel = req.params.IDhotel;

    typeEventModel.find({hotel:IDhotel},(err,typesEventsFound)=>{
        if(err) return res.status(404).send({report: 'Error in find typeError'});

        if(!typesEventsFound) return res.status(200).send({report: 'Type Event not exis'});

        return res.status(200).send(typesEventsFound);
    })
    
}


module.exports = {
    add,
    showEventsHotel
}