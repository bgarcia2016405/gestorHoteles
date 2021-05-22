import { Component, OnInit } from '@angular/core';
import { Datet } from 'src/app/models/date.model';
import { User } from 'src/app/models/user.model';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
  providers: [RoomService,UserService]
})
export class RoomsComponent implements OnInit {
  public token: string;
  public userModelGet: User;
  public datet: Datet;

  constructor(
    private roomService: RoomService,
    private userService: UserService
  ) {
    this.token = this.userService.getToken();
    this.datet = new Datet("","","");
   }

  ngOnInit(): void {

  }

  buscarCuarto(){
    this.roomService.buscarCuarto(this.datet).subscribe(
      response =>{
        console.log(response)
      }
    )
  }

}
