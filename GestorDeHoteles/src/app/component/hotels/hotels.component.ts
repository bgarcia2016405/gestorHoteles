import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { Service } from 'src/app/models/service.model';
import { typeServicio } from 'src/app/models/tipo-evento.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ServiceService } from 'src/app/services/service.service';
import { TypeEventService } from 'src/app/services/type-event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService, UserService, ServiceService, TypeEventService,ReservationService]
})
export class HotelsComponent implements OnInit {
  public token;
  public hotelModelGet: Hotel;
  public Events: typeServicio
  public service: Service
  public identidad
  public hotelEdit: Hotel
  public hotelSearch: Hotel
  public hotel: Hotel
  public state


  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private typeEventService: TypeEventService,
    private serviceService: ServiceService,
    private reservationService: ReservationService
  ) {
    this.token = this.userService.getToken();
    this.identidad = this.userService.getIdentidad();
    this.hotelEdit = new Hotel("","",0,0,"","","","","")
    this.hotelSearch = new Hotel("","",0,0,"","","","","")
    this.hotel = new Hotel("","",0,0,"","","","","")
   }

  ngOnInit(): void {
    this.obtenerHoteles();
    this.verificarar()
    this.state = "false"
  }

  verificarar(){
    this.reservationService.verficar().subscribe(
      response => {
        console.log(response)
      }
    )
  }

  obtenerHoteles(){
    this.hotelService.obtenerHoteles().subscribe(
      response=>{
        this.hotelModelGet = response
       console.log(this.hotelModelGet)
      }
    )
  }

  obtenerEventos(idHotel){
    this.typeEventService.obtenerEvento(idHotel).subscribe(
      response => {
        console.log(response)
        this.Events = response
      }
    )
  }

  obtenerServicio(idHotel){
    this.serviceService.obtenerServicio(idHotel).subscribe(
      response =>{
        console.log(response)
        this.service = response
      }
    )
  }

  obtenerIdHotel(idHotel){
    this.hotelService.hotel(idHotel).subscribe(
      response =>{

        this.hotelEdit = response
        console.log(this.hotelEdit)
      }
    )
  }

  editHotel(idHotel){
    this.hotelService.editHotel(idHotel,this.hotelEdit).subscribe(
      response=>{
        console.log(response)
        this.refresh();
      }
    )
  }

  dropHotel(idHotel){
    this.hotelService.dropHotel(idHotel).subscribe(

      response =>{
        this.refresh();
        console.log(response)

      }
    )
  }

  hotelName(){
    this.hotelService.hotelName(this.hotelSearch).subscribe(
      response=>{
        this.state = "true"
        this.hotel = response
        console.log(this.hotel)
      }
    )
  }

  refresh(): void{
    window.location.reload();
  }

}
