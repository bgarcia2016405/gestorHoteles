'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const hotelModel = require("../models/hotel.model");
const reservationModel = require("../models/reservation.model");
const serviceModel = require("../models/service.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

///////////////////////MANAGER//////////////////////////////////////

function add(req,res){
    var params = req.body;
    var validation = req.user.type;
    var ServiceModel = new serviceModel();

    if(validation =! manager) return res.status(404).send({report: 'You are not Manager'});

    hotelModel.findOne({manager:req.user.sub},(err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(202).send({report: 'Hotel not exist'});

        ServiceModel.hotel = hotelFound._id;
        ServiceModel.service = params.sevicio;
        ServiceModel.price = params.precio;
        
        
        ServiceModel.save((err,serviceSave)=>{
            if(err) return res.status(404).send({report:'service request error'});

            if(!serviceSave) return res.status(202).send({report: 'service dont save'});

            return res.status(200).send({serviceSave});
        })
    })
}

function serviceReservation(req,res){
    var params = req.body;
    var reservation = req.params.idReservation;
    var service = req.params.idService;
    var validation = req.user.type;
    

    reservationModel.findOne({_id : reservation }, (err,reservatrionFound)=>{
        for(let i=0; i<reservatrionFound.services.length; i++){
            if(reservatrionFound.services[i]==service){
                return res.status(200).send({report: 'Service has exist in your reservation'})
            }
        }
            reservationModel.findOneAndUpdate({_id :reservation},
                {$push:{services:service}}, {new:true},(err,reservationUpdate) =>{
                    if(err) return res.status(404).send({report:'Error in update service'});
                    
                    if(!reservationUpdate) return res.status(202).send({report: 'error request in update service'});

                    return res.status(200).send(reservationUpdate)
                }).populate('services', 'service')
        
    })

}

module.exports = {
    add,
    serviceReservation
}