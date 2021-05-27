import { Component, OnInit } from '@angular/core';
import { Evento } from 'src/app/models/event.model';
import { Hotel } from 'src/app/models/hotel.model';
import { typeServicio } from 'src/app/models/tipo-evento.model';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss']
})
export class EventoComponent implements OnInit {
  public hotel: Hotel;
  public event: Evento;
  public typoEvento: typeServicio
  public state: String

  constructor(
    private eventService: EventService,

  ) {
    this.hotel = new Hotel("","",0,0,"","","","","")
    this.event = new Evento("","","","",0,"")
    this.typoEvento = new typeServicio("","",0,"")
  }

  ngOnInit(): void {
    this.state = "true"

  }


  showhotel(){
    this.eventService.hotel(this.typoEvento.name).subscribe(
      response=>{
        console.log(response)
        this.typoEvento = response
      }
    )
  }

  reservar(){
    this.eventService.create(this.event).subscribe(
      response=>{
        console.log(response)
      }
    )
  }

  showEventDate(eventoId){
    this.eventService.showEventDate(eventoId).subscribe(
      response=>{
        this.state = "false"
        console.log(response)
      }
    )
  }


}
