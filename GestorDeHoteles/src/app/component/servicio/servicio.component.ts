import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { Service } from 'src/app/models/service.model';
import { HotelService } from 'src/app/services/hotel.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.scss'],
  providers: [UserService,ServiceService, HotelService]
})
export class ServicioComponent implements OnInit {
  public token;
  public idHotel: String;
  public hotelPost
  public idPais;
  public servisio;
  public tata;
  public serviceEdit

  constructor(
    private userService: UserService,
    private serviceService: ServiceService,
    private hotelService: HotelService
  ) {
    this.token = this.userService.getToken();
    this.servisio = new Service("","","",0);
    this.serviceEdit = new Service("","","",0);
    this.hotelPost = new Hotel("","",0,"","","","","");
   }

  ngOnInit(): void {
    this.showHotel()
  }

  refresh(): void{
    window.location.reload();
  }

  showHotel(){
    this.hotelService.showHotel().subscribe(
      response=>{
        console.log(response)
        this.idHotel = response._id
        this.hotelPost = response
        this.obtenerServicio(this.idHotel)
      }
    )
  }

  registrar(){
    this.serviceService.resgistrar(this.servisio).subscribe(
      response=>{
        console.log(response)
        this.servisio.service = "";
        this.servisio.price = "";

        this.refresh();
      }
      )
  }


  obtenerServicio(idHotel){
    this.serviceService.obtenerServicio(idHotel).subscribe(
      response=>{
        console.log(response);
        this.tata = response
      }
    )
  }

  showId(idService){
    this.serviceService.obtenerId(idService).subscribe(
      response=>{
        this.serviceEdit = response
        console.log(this.serviceEdit);
      }
    )
  }

  editSErvice(idService){
    this.serviceService.editarServicio(idService, this.serviceEdit).subscribe(
      response=>{
        console.log(response)
        this.showHotel();
      }
    )
  }

  eliminarService(idService){
    this.serviceService.eliminarServicio(idService).subscribe(
      response=>{
        console.log(response)
        this.showHotel();
      }
    )
  }

}
