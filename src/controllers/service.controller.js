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
        ServiceModel.service = params.service;
        ServiceModel.price = params.price;
        
        
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

function showId(req,res){
    var idService = req.params.idService
        serviceModel.findById(idService,(err,serviceFound)=>{
            if(err) return res.status(404).send({report: 'service requiest error'});

            if(!serviceFound) return res.status(202).send({report: 'room dont exist'});

            return res.status(200).send(serviceFound);
        })
    
}

function showService(req, res) {
    var idHotel = req.params.idHotel;

    serviceModel.find({hotel:idHotel},(err,serviceFound)=>{
        if(err) return res.status(404).send({report: 'service requiest error'});

        if(!serviceFound) return res.status(202).send({report: 'service not exist'});
    
        return res.status(200).send(serviceFound);
    })
}

function editService(req,res){
    var idService = req.params.idService;
    var params = req.body

    serviceModel.findByIdAndUpdate(idService,params, (err,serviceEdit)=>{
        if(err) return res.status(404).send({report: 'room requiest error'});

        if(!serviceEdit) return res.status(202).send({report: 'room dont exist'});

        return res.status(200).send(serviceEdit);
    })
}

function dropService(req,res){
    var idService = req.params.idService;

    serviceModel.findByIdAndDelete(idService, (err,serviceDeleted)=>{
        if(err) return res.status(404).send({report: 'room requiest error'});

        if(!serviceDeleted) return res.status(202).send({report: 'room dont exist'});

        return res.status(200).send(serviceDeleted)
    })
}

function showServiceHotel(req,res){

    hotelModel.findOne({manager:req.user.sub},{service:1,_id:0}, (err,serviceFound)=>{
      if(err) return res.status(404).send({report:'Error in find service'});
      if(!serviceFound) return res.status(202).send({report:'hotel not have service'});
      return res.status(200).send(serviceFound);
    })
}



module.exports = {
    add,
    serviceReservation,
    showServiceHotel,
    showId,
    showService,
    editService,
    dropService
}