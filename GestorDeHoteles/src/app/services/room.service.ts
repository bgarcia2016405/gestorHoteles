import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Datet } from '../models/date.model';
import { Room } from '../models/room.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   registrar(cuarto: Room, idHotel): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    let params = JSON.stringify(cuarto);

     return this.http.post(this.url + '/addRoom/' + idHotel, params, {headers: token})
   }

   obtenerCuartoHotel(idHotel): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    return this.http.get(this.url + '/showRoomHotel/'+ idHotel, {headers: token })
   }

   obtenerId(idCuarto): Observable<any>{
     return this.http.get(this.url + '/showId/'+idCuarto, {headers: this.headers} )
   }

   editarCuarto(idCuarto, cuarto: Room): Observable<any>{
    let params = JSON.stringify(cuarto)
     return this.http.put(this.url + '/editarRoom/'+ idCuarto, params, {headers: this.headers})
   }

   eliminarCuarto(idCuarto): Observable<any>{
     return this.http.delete(this.url + '/eliminarRoom/' + idCuarto, {headers: this.headers})
   }

   buscarCuarto(data:Datet): Observable<any>{

    let params = JSON.stringify(data)
    return this.http.post(this.url + '/searchRoomDate', params, {headers: this.headers})
   }

   showReservationRoom(idRoom): Observable<any>{
     return this.http.get(this.url + '/showReservationRoom/' + idRoom, {headers: this.headers})
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
