import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public token

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   registrar(reservation: Reservation,idRoom): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    let params = JSON.stringify(reservation);

     return this.http.post(this.url + '/reservation/' + idRoom, params, {headers: token})
   }

   showReservation(): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    return this.http.get(this.url + '/showMyReservation',{headers: token} )
   }

   cancelReservation(idReservation): Observable<any>{
    let headersToken = this.headers.set('Authorization', this.getToken())
    return  this.http.put(this.url + '/cancelReservation/' + idReservation ,{headers: headersToken} )
   }

   verficar(): Observable<any>{
     return this.http.get(this.url + '/verficar', {headers: this.headers})
   }

   getToken(){
    var token2 = localStorage.token;
    if(token2 != undefined){
      this.token = token2;
    }else{
      this.token = null
    }
    return this.token
  }
}
