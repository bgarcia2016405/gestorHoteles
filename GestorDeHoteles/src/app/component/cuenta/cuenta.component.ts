import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  providers: [UserService]
})
export class CuentaComponent implements OnInit {
  public cuentaModel;
  public token;
  public idUsuario: String;

  constructor(
    public activate : ActivatedRoute,
    public userService: UserService
  ) {
    this.token = this.userService.getToken()
    this.cuentaModel = new User("","","","","","","","");

  }

  ngOnInit(): void {
    this.activate.paramMap.subscribe(dataRuta=>{
      this.idUsuario = dataRuta.get('idUsuario')
    })
    this.obtenerUsuario(this.idUsuario)
  }

  obtenerUsuario(idUsuario){
    this.userService.obtenerUsuarioId(this.token, idUsuario).subscribe(
      response=>{
        this.cuentaModel = response
      })

  }

  editarUsuario(){
    this.userService.editarUsuario(this.cuentaModel).subscribe(
      response=>{
        console.log(response);
        this.obtenerUsuario(this.idUsuario);
      }
    )
  }

  eliminarUsuario(idUsuario){
    this.userService.eliminarUsuario(idUsuario).subscribe(
      response=>{
        console.log(response);
      }
    )
  }

}
