import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Service } from '../models/service.model';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public url: String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');
  public token;

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
  }

  resgistrar(servicio: Service): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    let params = JSON.stringify(servicio)
    return this.http.post(this.url + '/createService', params, {headers: token})
  }

  obtenerServicio(idHotel): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.get(this.url + '/showService/' + idHotel, {headers: token})
  }

  obtenerId(idServicio): Observable<any>{
    return this.http.get(this.url + '/showServiceId/' + idServicio,  {headers: this.headers})
  }

  editarServicio(idServicio, servicio:Service): Observable<any>{
    let params = JSON.stringify(servicio);
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.put(this.url + '/editService/'+ idServicio, params, {headers:token})
  }

  eliminarServicio(idServicio): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.delete(this.url + '/dropService/' + idServicio, {headers: token})
  }

  serviceReservation(idReservation,idService): Observable<any>{
    let token = this.headers.set('Authorization', this.getToken())
    return this.http.put(this.url + '/addService/' + idReservation + "/" + idService, {headers: token})
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
