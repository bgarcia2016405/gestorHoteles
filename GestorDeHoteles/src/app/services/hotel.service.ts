import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  public url:String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public token;
  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   obtenerHoteles(): Observable<any>{
     return this.http.get(this.url + '/showHotels', {headers: this.headers})
   }

   registro(hotel: Hotel): Observable<any>{
      let token = this.headers.set('Authorization', this.getToken());
      let params = JSON.stringify(hotel);

    return this.http.post(this.url + '/createHotel', params, {headers:token})
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

  showHotel(): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    return this.http.get(this.url + '/showHotel', {headers:token})
  }

}

