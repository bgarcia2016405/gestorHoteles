import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [HotelService]
})
export class ReportsComponent implements OnInit {
  stack;
  public hotel
  public hotelPosrt
  public typoEvento
  public taa

  // Doughnut
  public doughnutChartLabels: Label[] = ['Cancelación','Solicitudes'];


  public doughnutChartData: MultiDataSet = [[this.hotelSoliciudCancel(),this.hotelSoliciud()]];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(
    private hotelService: HotelService

  )
  {

    this.hotel = new Hotel("","",0,0,"","","","","")
    this.hotelPosrt = new Hotel("","",0,0,"","","","","")
  }

  ngOnInit(): void {
    this.report()
  }



  report(){
    this.hotelService.report().subscribe(
      response => {
        this.hotel = response
        console.log(this.hotel)
      }
    )

  }

  buscar(){
    this.hotelService.hotel(this.hotelPosrt._id).subscribe(
      response => {
        localStorage.setItem('hotel', JSON.stringify(response))
        this.refresh()
      }
    )
  }

  hotelSoliciud(){
    return this.stack = this.hotelService.getHotelSelected().stack

  }


  hotelSoliciudCancel(){
    return this.stack = this.hotelService.getHotelSelected().cancel

  }

  refresh(): void{
    window.location.reload();
  }
}
