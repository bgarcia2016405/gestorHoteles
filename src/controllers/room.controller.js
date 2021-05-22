'use strict'

const jwt = require('../service/jwt');
const bcrypt = require("bcrypt-nodejs");

const roomModel = require("../models/room.model");
const hotelModel = require("../models/hotel.model");

const user = 'Cliente';
const manager = 'Gerente';
const admin = 'Administrador';

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

  const fecha = new Date();

  if(fecha<params.CheckIn) return console.log('Si sirve')

  if(params.CheckIn>params.CheckOut) return console.log('HOla')

  if(params.CheckIn<params.CheckOut) return console.log('Puto')

  return console.log(params)

}

module.exports = {
    add,
    showRoomHotel,
    showId,
    editar,
    eliminar,
    searchRoomDate
}