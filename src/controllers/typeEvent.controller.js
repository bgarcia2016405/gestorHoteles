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

        TypeEventModel.name = params.name;
        TypeEventModel.price = params.price;
        TypeEventModel.hotel = hotelFound._id;

        typeEventModel.findOne({name:params.name,hotel: hotelFound._id},(err, type)=> {

            if(err) return res.status(404).send({report: 'type event requiest error'});

            if(!type){
              TypeEventModel.save((err,typeEventSave)=>{

                if(err) return res.status(404).send({report: 'type event requiest error'});
    
                if(!typeEventSave) return res.status(202).send({report: 'type event dont save'});
    
                return res.status(200).send(typeEventSave);
    
            });
    

            }else{
              return res.status(404).send(type);
            }

        
    });
})
}

function edit(req,res) {
    var params = req.body;
    var idTypoServicio = req.params.idTypoServicio
    var validation = req.user.type;
    
    if(validation =! manager)  return res.status(404).send({report: 'You are not Manager'});

    typeEventModel.findByIdAndUpdate(idTypoServicio,params,(err,typeEventEdit)=>{
                if(err) return res.status(404).send({report: 'type event requiest error'});
    
                if(!typeEventEdit) return res.status(202).send({report: 'type event dont edit'});
    
                return res.status(200).send(typeEventEdit);


    })

}

function show(req,res){
    var idTypoServicio = req.params.idTypoServicio; 

    typeEventModel.findById(idTypoServicio,(err,typeEvent)=>{
        if(err) return res.status(404).send({report: 'type event requiest error'});
    
        if(!typeEvent) return res.status(404).send({report: 'type event dont drop'});

        return res.status(200).send(typeEvent);
        
    })
}

function drop(req,res){
    var idTypoServicio = req.params.idTypoServicio;
    var validation = req.user.type;

    if(validation =! manager)  return res.status(404).send({report: 'You are not Manager'});

    typeEventModel.findByIdAndDelete(idTypoServicio, (err, typeEventDrop)=>{
        if(err) return res.status(404).send({report: 'type event requiest error'});
    
        if(!typeEventDrop) return res.status(202).send({report: 'type event dont drop'});

        return res.status(200).send(typeEventDrop);

    })

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
    showEventsHotel,
    edit,
    drop,
    show
}