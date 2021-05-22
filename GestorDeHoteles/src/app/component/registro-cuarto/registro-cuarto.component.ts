import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { Room } from 'src/app/models/room.model';
import { HotelService } from 'src/app/services/hotel.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-cuarto',
  templateUrl: './registro-cuarto.component.html',
  styleUrls: ['./registro-cuarto.component.scss'],
  providers: [UserService,RoomService, HotelService]

})
export class RegistroCuartoComponent implements OnInit {
  public token;
  public idHotel: String;
  public hotelPost
  public idPais;
  public room;
  public tata;
  public roomEdit


  constructor(
    private userService: UserService,
    private roomService: RoomService,
    private hotelService: HotelService
  ) {
    this.token = this.userService.getToken();
    this.room = new Room("","",0,0,0)
    this.hotelPost = new Hotel("","",0,"","","","","");
  }

  ngOnInit(): void {
    this.showHotel()

  }

  refresh(): void{
    window.location.reload();
  }

  registrar(){
    this.roomService.registrar(this.room, this.idHotel).subscribe(
      response =>{
        console.log(response);
        this.room.beds = "";
        this.room.persons = "";
        this.room.price = "";
        this.refresh();

      }
    ),
    error=>{
      console.log(<any>error);
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Error',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  obtenerCuarto(idHotel){
    this.roomService.obtenerCuartoHotel(idHotel).subscribe(
      response=>{
        console.log(response)
        this.tata = response

      }
    )
  }

  showId(idRoom){
    this.roomService.obtenerId(idRoom).subscribe(
      response=>{
        console.log(response);
        this.room = response
      }
    )
  }

  showHotel(){
    this.hotelService.showHotel().subscribe(
      response=>{
        console.log(response)
        this.idHotel = response._id
        this.hotelPost = response
        this.obtenerCuarto(this.idHotel)
      }
    )
  }

  editRoom(idRoom){
    this.roomService.editarCuarto(idRoom,this.room).subscribe(
      response =>{
        console.log(response)
        this.showHotel();
      }
    )
  }

  dropRoom(idRoom){
    this.roomService.eliminarCuarto(idRoom).subscribe(
      response =>{
        console.log(response)
        this.showHotel();
      }
    )
  }




}
