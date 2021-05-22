import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [UserService]
})
export class RegistroComponent implements OnInit {
  public user: User;

  constructor(
    private userService: UserService
  ) {
    this.user = new User("","","","","","","","");
   }

  ngOnInit(): void {
  }
  registrar(){
  this.userService.registro(this.user).subscribe(
    response=>{
      console.log(response)
    }
  )

}
}
