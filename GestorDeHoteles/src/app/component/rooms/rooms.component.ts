import { Component, OnInit } from '@angular/core';
import { Datet } from 'src/app/models/date.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Room } from 'src/app/models/room.model';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { ReservationService } from 'src/app/services/reservation.service';
import { RoomService } from 'src/app/services/room.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [RoomService,UserService,ReservationService,ServiceService]
})
export class RoomsComponent implements OnInit {
  public token: string;
  public userModelGet: User;
  public datet: Datet;
  public room: Room;
  public service: Service;
  public reservation: Reservation;
  public roomGet:Room;
  public idRoom
  public idHotel

  constructor(
    private roomService: RoomService,
    private userService: UserService,
    private ReservationService: ReservationService,
    private serviceService: ServiceService
  ) {
    this.token = this.userService.getToken();
    this.datet = new Datet("","","");
    this.room = new Room("","",0,"",0,0)
    this.roomGet = new Room("","",0,"",0,0)
    this.reservation = new Reservation("","","","","","",[""])

   }

  ngOnInit(): void {
    this.verificar()
  }

  verificar(){
    this.ReservationService.verficar().subscribe(
      response => {
        console.log(response)
      }
    )
  }

  buscarCuarto(){
    this.roomService.buscarCuarto(this.datet).subscribe(
      response =>{

        this.room = response

        console.log(this.room )
      }
    )
  }

  buscarId(idCuarto){
    this.roomService.obtenerId(idCuarto).subscribe(
      response=>{
        this.idRoom = response._id
        this.reservation.checkIn = this.datet.CheckIn
        this.reservation.checkOut = this.datet.CheckOut
        this.idHotel = response.hotel;
        this.showService( this.idHotel);
        console.log(this.reservation)
      }
    )
  }

  registrar(){
    this.ReservationService.registrar(this.reservation,this.idRoom).subscribe(
      response =>{
        console.log(response)
        this.refresh()
      }
    )
  }

  showService(idHotel){
    this.serviceService.obtenerServicio(idHotel).subscribe(
      response=>{
        console.log(response)
        this.service = response
      }
    )
  }

  refresh(): void{
    window.location.reload();
  }

}
