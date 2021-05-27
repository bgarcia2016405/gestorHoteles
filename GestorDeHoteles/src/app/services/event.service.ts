import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/event.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;

  }

  create(evente:Evento):Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    let params = JSON.stringify(evente);

    return this.http.post(this.url + '/createEvent', params, {headers: token})
  }

  hotel(typoEvento): Observable<any>{
    return this.http.get(this.url + '/hotelEvento/' + typoEvento, {headers: this.headers})
  }

  showEventDate(eventoId): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken());
    return this.http.get(this.url + '/showEventDate/' + eventoId, {headers: token})
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
