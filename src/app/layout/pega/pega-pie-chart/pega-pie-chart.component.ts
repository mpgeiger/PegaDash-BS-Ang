import { Component, OnInit, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

@Component({
  selector: 'app-pega-pie-chart',
  templateUrl: './pega-pie-chart.component.html',
  styleUrls: ['./pega-pie-chart.component.scss'],
  animations: [routerTransition()]
})
export class PegaPieChartComponent implements OnInit, AfterViewInit {


  // Pie
  public pieChartLabels: Label[] = [
    'Phone',
    'Email',
    'Self Service',
    'Chat'
];
// public pieChartType: ChartType = 'pie';
public pieChartData: SingleDataSet = [180, 392, 49, 10];
// public pieChartLegend = true;
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'right'
  }
};
   // console; .// public pieChartOptions: any = {
   // console; .// 	legend: {position: 'right'}
// };

 // events
 public chartClicked(e: any): void {
  // console.log(e);
}

public chartHovered(e: any): void {
  // console.log(e);
}

constructor() {
  // monkeyPatchChartJsTooltip();
  // monkeyPatchChartJsLegend();
 }
  ngOnInit() {
    // this.pieChartOptions.legend.position = 'right';
    // this.pieChartOptions.legend.position = 'bottom';
    // this.pieChartType.legend.position = 'right';

    this.pieChartType = 'pie';

  }
  ngAfterViewInit(): void {
    // this.pieChartOptions.legend.position = 'bottom';

  }

  changeLegendPosition() {
    console.log(' before legend change-->' + this.pieChartOptions.legend.position );
    this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'bottom' ? 'top' : 'bottom';
   // this.pieChartOptions.label.position = this.pieChartOptions.label.position === 'bottom' ? 'top' : 'bottom';
console.log(' after legend change-->' + this.pieChartOptions.legend.position);


}
}
