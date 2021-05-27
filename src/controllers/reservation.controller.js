'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const reservationModel = require("../models/reservation.model");
const hotelModel = require("../models/hotel.model");
const roomModel = require("../models/room.model");


const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

const fecha = new Date();
const reservate = 'Reservado';
const curso = 'Curso';
const terminado = 'Finalizado';
const cancelado = ' Cancelado';



///////////////////////USUARIO//////////////////////////////////////
function reservation(req,res){
    var params = req.body;
    var user = req.user.sub;
    var roomID = req.params.roomID
    var ReservationModel = new reservationModel();


    if(params.checkIn>params.checkOut) return res.status(404).send({report:'Entrada no valida'});

     var chek = new Date(params.checkIn);
     var chok = new Date(params.checkOut)

    if(fecha > chek) return res.status(404).send({report:'Fecha ya pasada'});

    if(fecha == chek) return res.status(404).send({return:'Tienes que reservar minimo un día antes'})

    reservationModel.find({room:roomID,  $or: [ { state: reservate } , { state: curso } ] }, (err,reservationFound)=>{
        
        if(err) return res.status(404).send({report: 'reservation requiest error'});
        
        
        
            reservationFound.forEach(element=>{
                if(params.CheckIn <= element.checkIn && params.CheckIn>=element.checkOut){
                    res.status(404).send({report:'Cuarto Ya Reservado'});
                  }
          
                  if(params.checkOut <= element.checkIn && params.checkOut>=element.checkOut){
                    res.status(404).send({report:'Cuarto Ya Reservado'});
                  }


            })      

            roomModel.findById(roomID, (err,roomFound)=>{


              hotelModel.findById(roomFound.hotel,(err,hotelFound)=>{
                var stack = hotelFound.stack

                hotelModel.findByIdAndUpdate(hotelFound._id,{stack:stack+1},(err,stackSumado)=>{
                  
                  if(err) return res.status(404).send({report:'Error in find Room'});
        
                  if(!roomFound) return res.status(200).send({report:'Room not exist'});
          
                  
                  ReservationModel.user = user;
                  ReservationModel.room = roomID;
                  ReservationModel.state = reservate;
                  ReservationModel.checkIn = params.checkIn;
                  ReservationModel.checkOut =params.checkOut;
          
                  
                
                 //////////// cumpleanos = new Date(params.Entrada);
                   ///////////////////////////////////////////////////////////////////////
                 //////// return console.log( 'Para el frontent resolver la fecha'  );
                  
                  ReservationModel.save((err,reservationSave)=>{
                      if(err) return res.status(404).send({report: 'reservation requiest error'});
                  
                      if(!reservationSave) return res.status(202).send({report: 'reservation dont save'});
          
                      return res.status(200).send(reservationSave);
                  })




                })


              })

        
               
            })

        
            
    })

    //return res.status(200).send(roomID);
 
  /*  roomModel.findById(roomID, (err,roomFound)=>{
        
        if(err) return res.status(404).send({report:'Error in find Room'});

        if(!roomFound) return res.status(200).send({report:'Room not exist'});


        ReservationModel.user = user;
        ReservationModel.room = roomID;
        ReservationModel.state = reservate;
        ReservationModel.checkIn = params.checkIn;
        ReservationModel.checkOut = params.checkOut;

        return  res.status(202).send(ReservationModel   );

       //////////// cumpleanos = new Date(params.Entrada);
         ///////////////////////////////////////////////////////////////////////
       //////// return console.log( 'Para el frontent resolver la fecha'  );
        
        ReservationModel.save((err,reservationSave)=>{
            if(err) return res.status(404).send({report: 'reservation requiest error'});
        
            if(!reservationSave) return res.status(202).send({report: 'reservation dont save'});

            return res.status(200).send(reservationSave);
        })
    })*/
}

function Cancelar(req,res){
    var idReservation = req.params.idReservation;
    
    reservationModel.findByIdAndUpdate(idReservation, {state:cancelado},(err,reservationCancel)=>{
      roomModel.findById(reservationCancel.room,(err,roomFound)=>{

        hotelModel.findById(roomFound.hotel,(err,hotelFound)=>{
          var stack = hotelFound.stack;
          var cancel = hotelFound.cancel;
          
          hotelModel.findByIdAndUpdate(roomFound.hotel, {stack:stack-1, cancel:cancel+1},(err,stackFound)=>{
             if(err) return res.status(404).send({report:'Error in find reservation'});

        if(!reservationCancel) return res.status(402).send({report:'reservation not exist'});

        return res.status(200).send(reservationCancel)
          })

          
        })

       
      })

        
    })
}

function showMyReservation(req,res){
    var user = req.user.sub;
    reservationModel.find({user:user}, (err,reservationFound)=>{
        if(err) return res.status(404).send({report:'Error in find reservation'});

        if(!reservationFound) return res.status(402).send({report:'reservation not exist'});

        return res.status(200).send(reservationFound)
    }).populate('services room')
}

function verfirvar(req,res){
 



  reservationModel.find((err,reservationFound)=>{

    

    reservationFound.forEach(element=>{
      
      const Entrada = new Date(element.checkIn);
      const Salida = new Date(element.checkOut);
      if(element.state != cancelado){

        if(fecha >= Entrada && fecha<=Salida){
          
          reservationModel.findByIdAndUpdate(element._id,{state:curso},(err,reservationCurso)=>{
  
          })
        }
  
        if(fecha>Salida){
          reservationModel.findByIdAndUpdate(element._id,{state:terminado},(err,reservationTerminado)=>{
  
          })
        }
        
      }
      
     
    })

  })
}


///////////////////////MANAGER//////////////////////////////////////
function showReservation(req,res){
    var user = req.user.sub;
    var validation = req.user.type;

    if(validation != manager) return res.status(400).send({report:'You are not manager'});

    hotelModel.findOne({manager:user}, (err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(402).send({report:'Hotel not exist'});

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
    reservation,
    showMyReservation,
    Cancelar,
    verfirvar
}