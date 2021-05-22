import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { Service } from 'src/app/models/service.model';
import { typeServicio } from 'src/app/models/tipo-evento.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ServiceService } from 'src/app/services/service.service';
import { TypeEventService } from 'src/app/services/type-event.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [HotelService, UserService, ServiceService, TypeEventService]
})
export class HotelsComponent implements OnInit {
  public token;
  public hotelModelGet: Hotel;
  public Events: typeServicio
  public service: Service




  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private typeEventService: TypeEventService,
    private serviceService: ServiceService
  ) {
    this.token = this.userService.getToken();
   }

  ngOnInit(): void {
    this.obtenerHoteles();
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



}
