'use strict'

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//////////////////////////////////////////////////

const bill_rutes = require("./src/rutes/bill.rutes")
const user_rutes = require("./src/rutes/user.rutes");
const room_rutes = require("./src/rutes/room.rutes");
const hotel_rutes = require("./src/rutes/hotel.rutes");
const event_rutes = require("./src/rutes/event.rutes");
const service_rutes = require("./src/rutes/service.rutes");
const typeEvent_rutes = require("./src/rutes/typeEvet.rutes");
const reservation_rutes = require("./src/rutes/reservation.rutes");

////////////////////////////////////////////////

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(cors());

///////////////////////////////////////////////

app.use('/api', bill_rutes,
                user_rutes, 
                room_rutes,
                hotel_rutes,  
                event_rutes, 
                service_rutes,
                typeEvent_rutes,
                reservation_rutes);

////////////////////////////////////////////////

module.exports = app;
