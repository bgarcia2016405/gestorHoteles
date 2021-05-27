import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {
  public cuentaModel;
  public token;
  public idUsuario: String;

  constructor(
    public userService: UserService,
  ) {
    this.token = this.userService.getToken()
    this.cuentaModel = new User("","","","","","","","");
  }

  ngOnInit(): void {
    this.showAllUser()
  }


  showAllUser(){
    this.userService.showAllUser().subscribe(
      response => {
        this.cuentaModel = response
        console.log(response)
      }
    )
  }


}
