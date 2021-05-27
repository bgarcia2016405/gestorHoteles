import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistroComponent } from './component/registro/registro.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CuentaComponent } from './component/cuenta/cuenta.component';
import { HotelsComponent } from './component/hotels/hotels.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegistroHotelComponent } from './component/registro-hotel/registro-hotel.component';
import { ServicioComponent } from './component/servicio/servicio.component';
import { TypoEventosComponent } from './component/typo-eventos/typo-eventos.component';
import { LateralNavbarComponent } from './component/lateral-navbar/lateral-navbar.component';
import { RoomsComponent } from './component/rooms/rooms.component';
import { RegistroCuartoComponent } from './component/registro-cuarto/registro-cuarto.component';
import { HotelComponent } from './component/hotel/hotel.component';
import { EventoComponent } from './component/evento/evento.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { FacturasComponent } from './component/facturas/facturas.component';
import { ReportsComponent } from './component/reports/reports.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    NavbarComponent,
    CuentaComponent,
    HotelsComponent,
    RegistroHotelComponent,
    ServicioComponent,
    TypoEventosComponent,
    LateralNavbarComponent,
    RoomsComponent,
    RegistroCuartoComponent,
    HotelComponent,
    EventoComponent,
    UsuarioComponent,
    FacturasComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
