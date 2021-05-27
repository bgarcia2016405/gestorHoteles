'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const reservationModel = require("../models/reservation.model");
const serviceModel = require("../models/service.model");
const roomModel = require("../models/room.model");
const billModel = require("../models/bill.model");
const { find } = require('../models/reservation.model');

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

const fecha = new Date();


function generate(req,res){
    var idReservatio = req.params.idReservatio
    var BillModel = new billModel();
    var totalServicio = 0;
    var i = 0
    

    billModel.findOne({reservacion:idReservatio},(err,billFound)=>{
        if(err) return res.status(404).send({report:'Error in find bill'});

        if(billFound) return res.status(200).send({report:'Bill Exist'});

         reservationModel.findById(idReservatio,(err,reservationFound)=>{
        if(err) return res.status(404).send({report:'Error in find reservation'});
        
                if(!reservationFound) return res.status(200).send({report:'Reservation not exist'});
                var fecha1 = new Date(reservationFound.checkIn)
                var fecha2 = new Date(reservationFound.checkOut);

                var dates = getDates(new Date(reservationFound.checkIn), new Date(reservationFound.checkOut));

              

                //var day_as_milliseconds = 86400000;
                //var diff = fecha2 - fecha1;
                var days = dates.length

                roomModel.findById(reservationFound.room,(err,roomFound)=>{
                    if(err) return res.status(404).send({report:'Error in find reservation'});
        
                if(!roomFound) return res.status(200).send({report:'Reservation not exist'});
                    
                var priceRoom = roomFound.price * days
               

                reservationFound.services.forEach(elemento=>{
                    
                    serviceModel.findById(elemento,(err,serviceFound)=>{
                        i = i + 1
                        var l = serviceFound.price;
                        
                        totalServicio = totalServicio + l
                        
                       
                        BillModel.total = totalServicio+priceRoom;
                         BillModel.reservacion = reservationFound._id;
                        BillModel.days = days;

                        if ( reservationFound.services.length === i) {
                            BillModel.save((err,billSave)=>{
                                if(err) return res.status(404).send({report:'Error in find reservation'});
        
                                if(!billSave) return res.status(200).send({report:'Reservation not exist'});
                                return res.status(200).send(billSave);
                            });
                        }
                        
                        
                        })

                        
                    })


                })

    })
    
    })

   

    
}

var getDates = function(fecha1, fecha2) {
    var dates = [],
        currentDate = fecha1,
        addDays = function(days) {
          var date = new Date(this.valueOf());
          date.setDate(date.getDate() + days);
          return date;
        };
    while (currentDate <= fecha2) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  };

function showDetalle(req,res){
    var idBill = req.params.idBill;

    billModel.findOne({reservacion:idBill},(err,BillFound)=>{
        reservationModel.findById(idBill,(err,reservationFound)=>{
            roomModel.findById(reservationFound.room,(err,room)=>{
                return res.status(200).send({BillFound, reservationFound, room})
            }).populate('hotel ')

            
        }).populate('services user ')

        
    }).populate('reservacion ')
}

module.exports = {
    generate,
    showDetalle
}