import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  public url:String;
  public headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(public http: HttpClient) {
    this.url = GLOBAL.url;
   }

   generateBill(idReservatio): Observable<any>{
     return this.http.get(this.url + '/generateBill/' + idReservatio, {headers: this.headers})
   }

   showBill(idBill): Observable<any>{
     return this.http.get(this.url + '/showDetalle/' + idBill, {headers: this.headers})
   }

}
