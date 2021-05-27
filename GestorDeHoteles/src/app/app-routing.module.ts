import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CuentaComponent } from './component/cuenta/cuenta.component';
import { RegistroComponent } from './component/registro/registro.component';
import { HotelsComponent } from './component/hotels/hotels.component';
import { RegistroHotelComponent } from './component/registro-hotel/registro-hotel.component';
import { ServicioComponent } from './component/servicio/servicio.component';
import { TypoEventosComponent } from './component/typo-eventos/typo-eventos.component';
import { RoomsComponent } from './component/rooms/rooms.component';
import { RegistroCuartoComponent } from './component/registro-cuarto/registro-cuarto.component';
import { HotelComponent } from './component/hotel/hotel.component';
import { EventoComponent } from './component/evento/evento.component';
import { UsuarioComponent } from './component/usuario/usuario.component';
import { ReportsComponent } from './component/reports/reports.component';


const routes: Routes = [
  { path: 'registro', component: RegistroComponent},
  { path: 'cuenta/:idUsuario', component: CuentaComponent},
  { path: 'hoteles', component: HotelsComponent },
  { path: 'registroHoteles', component: RegistroHotelComponent},
  { path: 'servicios', component: ServicioComponent},
  { path: 'tipoEventos', component: TypoEventosComponent},
  { path: 'cuartos', component: RoomsComponent},
  { path: 'cuarto', component: RegistroCuartoComponent},
  { path: 'hotel/:idHotel', component: HotelComponent},
  { path: 'evento', component: EventoComponent},
  { path: 'usuario', component:UsuarioComponent},
  { path: 'reportes', component: ReportsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
