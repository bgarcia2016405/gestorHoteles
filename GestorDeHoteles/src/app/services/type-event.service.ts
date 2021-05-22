import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { typeServicio } from '../models/tipo-evento.model';
import { GLOBAL } from './global.service';


@Injectable({
  providedIn: 'root'
})
export class TypeEventService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public token;


  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   registrar(typoEvento:typeServicio) : Observable<any>{
     let token = this.headers.set('Authorization', this.getToken());
     let params = JSON.stringify(typoEvento)
     return this.http.post(this.url + '/addTypeEvent', params, {headers: token})
   }

   obtenerEvento(idHotel:String): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    return this.http.get(this.url + '/showEventsHotel/'+ idHotel, {headers:token})
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

  showId(idHotel: String): Observable<any>{{
    return this.http.get(this.url + '/showTypeEvent/'+idHotel, {headers: this.headers})
  }

  }

  drop(idHotel: String): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    return this.http.delete(this.url + '/dropEventsHotel/'+ idHotel, {headers:token} )
  }

  edit(idHotel:String,typoEvento:typeServicio): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    let params = JSON.stringify(typoEvento);
    return this.http.put(this.url + '/editEventsHotel/'+ idHotel, params ,{headers:token})
  }
}
