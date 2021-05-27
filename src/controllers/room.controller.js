'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const roomModel = require("../models/room.model");
const hotelModel = require("../models/hotel.model");
const reservationModel = require("../models/reservation.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

const fecha = new Date();
const reservate = 'Reservado';
const curso = 'Curso'
const cancelado = ' Cancelado';

const f = 'false';
const t = 'true';

///////////////////////ADMINISTRIDOR//////////////////////////////////////
function add(req,res){
    var params = req.body;
    var validation = req.user.type;
    var idHotel = req.params.idHotel;
    var RoomModel = new roomModel();

    if(validation =! admin) return res.status(404).send({report: 'You are not Admin'});

    hotelModel.findById(idHotel, (err,hotelFound)=>{
        if(err) return res.status(404).send({report:'Error in find hotel'});

        if(!hotelFound) return res.status(2020).send({report:'Hotel not exist'});

    RoomModel.hotel = idHotel;
    RoomModel.beds = params.beds;
    RoomModel.state = t
    RoomModel.price = params.price;
    RoomModel.persons = params.persons;
    RoomModel.description = params.descripcion;

    

        RoomModel.save((err,roomSave)=>{
            if(err) return res.status(404).send({report: 'room requiest error'});

            if(!roomSave) return res.status(202).send({report: 'room dont save'});

            return res.status(200).send(roomSave);
        })

    })
    
}

///////////////////////MANAGER//////////////////////////////////////
function showId(req,res){
  var idRoom = req.params.idRoom;

  roomModel.findById(idRoom, (err,roomFound)=>{
    if(err) return res.status(404).send({report: 'room requiest error'});

            if(!roomFound) return res.status(202).send({report: 'room dont exist'});

            return res.status(200).send(roomFound);
  })
}

function editar(req,res){
  var idRoom = req.params.idRoom;
  var params = req.body

  roomModel.findByIdAndUpdate(idRoom,params,(err,roomEdit)=>{
    if(err) return res.status(404).send({report: 'room requiest error'});

    if(!roomEdit) return res.status(202).send({report: 'room dont exist'});

    return res.status(200).send(roomEdit);
  })
}

function eliminar(req,res){
  var idRoom = req.params.idRoom;

  roomModel.findByIdAndDelete(idRoom,(err,roomDelete)=>{
    if(err) return res.status(404).send({report: 'room requiest error'});

    if(!roomDelete) return res.status(202).send({report: 'room dont exist'});

    return res.status(200).send(roomDelete);
  })
}

/////////////////////////Usuario////////////////////////////////////////////
function showRoomHotel(req,res){
    var IDhotel = req.params.IDhotel;

    roomModel.find({hotel:IDhotel},(err,roomsFound)=>{
        if(err) return res.status(404).send({report:'Error find rooms'});

        if(!roomsFound) return res.status(200).send({report:'Hotel rooms not exist'});

        return res.status(202).send(roomsFound);
    })
}

function searchRoomDate(req,res){
  var params = req.body

  reservationModel.find({ $or: [  { state: curso } , { state: reservate} ] },(err,reservationFound)=>{
    if(err) return res.status(404).send({report:'Error find rooms'});

    if(!reservationFound) return res.status(200).send({report:'Hotel rooms not exist'});
 
    reservationFound.forEach(
     
      element =>{
        console.log(params.CheckOut)
       if(params.CheckOut == element.checkOut) console.log("xd")

        if(params.CheckIn >= element.checkIn && params.CheckIn<=element.checkOut){
          roomModel.findByIdAndUpdate(element.room,{state:f},(err,roomFalseCheckIn)=>{
           

          })
        }

        if(params.CheckOut >= element.checkIn && params.CheckOut <= element.checkOut){
          roomModel.findByIdAndUpdate(element.room,{state:f},(err,roomFalsecheckOut)=>{
          console.log(element)
            
          })
        }
        
      });
   

      roomModel.find({state:t},(err,rooms)=>{



       

         roomModel.find({state:f},(err,roomsUpdate)=>{

          roomsUpdate.forEach(olomont => {
              roomModel.findByIdAndUpdate(olomont._id,{state:t},(err,roomreturn)=>{
              })
              
          });
          return  res.status(202).send(rooms);
         })
      }).populate('hotel')



  })



}


function showReservationRoom(req,res){
  var idRoom = req.params.idRoom;

  reservationModel.find({room:idRoom,state:reservate},(err,reservationFound)=>{
    if(err) return res.status(404).send({report:'Error find rooms'});

    if(!reservationFound) return res.status(200).send({report:'Hotel rooms not exist'});

    return res.status(200).send(reservationFound)
  })
}


function getDates(startDate, endDate){

  var dates = [],
  currentDate = startDate,
  addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };
while (currentDate <= endDate) {
dates.push(currentDate);
currentDate = addDays.call(currentDate, 1);
}
return dates;

}

module.exports = {
    add,
    showRoomHotel,
    showId,
    editar,
    eliminar,
    searchRoomDate,
    showReservationRoom
}


/*
if(fecha<params.CheckIn) return res.status(404).send({report:'Date you find is incorrect'});



 

var horaA = new Date(params.CheckIn);
var horaB = new Date(params.CheckOut);

if(horaA > horaB) return console.log('El checkOut Es mayor')

 var hola = horaB - horaA
var cumpleanos = new Date(hola);

var d1 = new Date('2021-05-22')
var d2 = new Date('2021-05-25')

var dates = getDates(new Date(params.CheckIn), new Date(params.CheckOut));
dates.forEach(function(date) {

 reservationModel.find({ $or: [  { checkIn: date } , { checkOut: date} ] }, (err, roomFound)=>{

 } )
 
});


 return console.log(dates)

 roomModel.find((err,roomFound)=>{ 
   console.log(roomFound)
   reservationModel.find({state:reservate, })
 })
 **/