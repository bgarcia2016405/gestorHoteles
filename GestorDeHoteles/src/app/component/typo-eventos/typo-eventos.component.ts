import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { typeServicio } from 'src/app/models/tipo-evento.model';
import { HotelService } from 'src/app/services/hotel.service';
import { TypeEventService } from 'src/app/services/type-event.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-typo-eventos',
  templateUrl: './typo-eventos.component.html',
  styleUrls: ['./typo-eventos.component.scss'],
  providers: [HotelService, UserService, TypeEventService]
})
export class TypoEventosComponent implements OnInit {
  public token;
  public idHotel : String;
  public hotelPosrt
  public typoEvento
  public taa

  constructor(
    private hotelService: HotelService,
    private userService: UserService,
    private typeEvent: TypeEventService

  ) {
    this.token = this.userService.getToken();
    this.hotelPosrt = new Hotel("","",0,0,"","","","","")
    this.typoEvento = new typeServicio("","",0,"")
   }

  ngOnInit(): void {
    this.showHotel();

  }

  refresh(): void{
    window.location.reload();
  }

  showHotel(){
    this.hotelService.showHotel().subscribe(
      response =>{
        console.log(response)
        this.idHotel = response._id
        console.log(this.idHotel)
        this.hotelPosrt = response
        this.obtenerEvento(this.idHotel);
      }
    )
    }

    showId(idTypoEvento){
      this.typeEvent.showId(idTypoEvento).subscribe(
        response =>{
          console.log(response)
          this.typoEvento = response
        }
      )
    }

    obtenerEvento(idHotel){
      this.typeEvent.obtenerEvento(idHotel).subscribe(

        response =>{

          console.log(response)
          this.taa = response
        }
      )
    }

    editarEvento(idHotel){
      this.typeEvent.edit(idHotel,this.typoEvento).subscribe(
        response=>{
          this.showHotel();
        }

      )
    }

    dropEvento(idHotel){
      this.typeEvent.drop(idHotel).subscribe(
        response=>{
          this.showHotel();
        }
      )
    }

    evento(){
      this.typeEvent.registrar(this.typoEvento).subscribe(
        response =>{

          console.log(response)
          this.typoEvento.name = "";
          this.typoEvento.price = "";
          this.refresh();

        },
        error=>{
          console.log(<any>error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Evento ya existe en tu hotel',
            showConfirmButton: false,
            timer: 1500
          })
        }
      )
    }



}
