import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Bill } from 'src/app/models/bill.model';
import { Reservation } from 'src/app/models/reservation.model';
import { Room } from 'src/app/models/room.model';
import { Service } from 'src/app/models/service.model';
import { User } from 'src/app/models/user.model';
import { BillService } from 'src/app/services/bill.service';
import { ReservationService } from 'src/app/services/reservation.service';
import { ServiceService } from 'src/app/services/service.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.scss'],
  providers: [UserService,ReservationService,ServiceService, BillService]
})
export class CuentaComponent implements OnInit {
  public cuentaModel;
  public token;
  public idUsuario: String;
  public reservation
  public service
  public reservationEdit
  public idReservation;
  public serviceEdit
  public serviciosFac
  public bill
  public room

  constructor(
    public activate : ActivatedRoute,
    public userService: UserService,
    public reservationService: ReservationService,
    public ServiceService:ServiceService,
    public billService : BillService
  ) {
    this.token = this.userService.getToken()
    this.cuentaModel = new User("","","","","","","","");
    this.reservation = new Reservation("","","","","","",[""])
    this.reservationEdit = new Reservation("","","","","","",[""])
    this.service = new Service("","","",0)
    this.serviceEdit = new Service("","","",0)
    this.serviciosFac = new Service("","","",0)
    this.bill = new Bill("","",0,0)
    this.room = new Room("","",0,"",0,0)
  }

  ngOnInit(): void {
    this.verificar()
    this.activate.paramMap.subscribe(dataRuta=>{
      this.idUsuario = dataRuta.get('idUsuario')
    })
    this.obtenerUsuario(this.idUsuario)

  }

  verificar(){
    this.reservationService.verficar().subscribe(
      response => {
        console.log(response)
      }
    )
  }

  obtenerUsuario(idUsuario){
    this.userService.obtenerUsuarioId(this.token, idUsuario).subscribe(
      response=>{
        this.cuentaModel = response
        this.obtenerReservaciones()
      })

  }

  obtenerReservaciones(){
    this.reservationService.showReservation().subscribe(
      response=>{
        this.reservation = response
        this.service = this.reservation
        console.log(this.reservation)
      }
    )
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

  obtenerServicios(idHotel,idReservacion){
    this.ServiceService.obtenerServicio(idHotel).subscribe(
      response =>{
        this.idReservation = idReservacion;
        console.log(this.idReservation)
        console.log(response)
        this.service = response
      }
    )

  }

  obtenerReservacion(idReservation){
    this.idReservation = idReservation

  }

  cancelarReservation(){
    this.reservationService.cancelReservation(this.idReservation ).subscribe(
      response =>{
         console.log(response)
      this.refresh()
      }

    )
  }

  capturar(){
    console.log(this.idReservation)
    console.log(this.serviceEdit._id)
    this.ServiceService.serviceReservation(this.idReservation,this.serviceEdit._id).subscribe(
      response =>{
        console.log(response)
        this.refresh()
      }
    )
  }
  refresh(): void{
    window.location.reload();
  }

  showBill(idBill){
    this.billService.showBill(idBill).subscribe(
      response =>{
        this.serviciosFac = response.reservationFound
        this.bill = response.BillFound
        this.room = response.room
        console.log(response.BillFound)
        console.log(this.room)
        console.log(this.serviciosFac)

      }
    )
  }

  generateBill(idReservation){
    this.billService.generateBill(idReservation).subscribe(
      response =>{
        console.log(response)
      }
    )
  }



}
