import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Room } from 'src/app/models/room.model';
import { Service } from 'src/app/models/service.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [HotelService,ReservationService, ServiceService, UserService, RoomService]
})
export class HotelComponent implements OnInit {
  public token;
  public reservation
  public reservationModel
  public service
  public hotel
  public idHotel
  public idRoom
  public room
  public identidad

  constructor(
    public activate : ActivatedRoute,
    public userService: UserService,
    public reservationService: ReservationService,
    public ServiceService:ServiceService,
    public hotelService: HotelService,
    public roomService: RoomService,
    private router: Router
  ) {
    this.token = this.userService.getToken()
    this.reservation = new Reservation("","","","","","",[""])
    this.reservationModel = new Reservation("","","","","","",[""])
    this.service = new Service("","","",0)
    this.hotel = new Hotel("","",0,0,"","","","","")
    this.room = new Room("","",0,"",0,0)
    this.identidad = this.userService.getIdentidad();
   }

  ngOnInit(): void {

    this.activate.paramMap.subscribe(dataRuta=>{
      this.idHotel = dataRuta.get('idHotel')
    })
    this.verificarar();
    this.showHotel();
    this.showRoom();
  }


  showHotel(){
    this.hotelService.hotel(this.idHotel).subscribe(
      response=>{
        this.hotel = response
        console.log(response)

      }
    )
  }

  showRoom(){
    this.roomService.obtenerCuartoHotel(this.idHotel).subscribe(
      response=>{
        this.room = response
        console.log(response)
      }
    )
  }

  showReservationRoom(idRoom){
    this.roomService.showReservationRoom(idRoom).subscribe(
      response=>{
        console.log(response)
        this.reservation = response
      }
    )
  }

  create(idRoom,idUsuario){
    this.reservationService.registrar(this.reservationModel,idRoom).subscribe(
      response=>{
        this.router.navigate(['/cuenta', idUsuario])
        console.log(response)
      }
    )

  }

  verificarar(){
    this.reservationService.verficar().subscribe(
      response => {
        console.log(response)
      }
    )
  }




}
