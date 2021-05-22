import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel.model';
import { User } from 'src/app/models/user.model';
import { HotelService } from 'src/app/services/hotel.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro-hotel',
  templateUrl: './registro-hotel.component.html',
  styleUrls: ['./registro-hotel.component.scss'],
  providers: [HotelService, UserService]
})
export class RegistroHotelComponent implements OnInit {
  public token;
  public hotelModelAdd: Hotel;
  public userModelGet: User;

  constructor(
    private hotelService: HotelService,
    private userService: UserService
  ) {
    this.hotelModelAdd = new Hotel("","",0,"","","","","");
    {this.token = this.userService.getToken();}
  }

  ngOnInit(): void {
    this.usuarioManager()
    console.log(this.userService.getToken())
  }

  usuarioManager(){
    this.userService.usuarioManager().subscribe(
      response => {
        this.userModelGet = response;
        console.log(response)
      }
    )
  }

  registrar(){
    this.hotelService.registro(this.hotelModelAdd).subscribe(
      response => {
        console.log(response)
      },
      error=>{
        console.log(<any>error);
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'No eres manager',
          showConfirmButton: false,
          timer: 1500
        })
      }
    )

  }


}
