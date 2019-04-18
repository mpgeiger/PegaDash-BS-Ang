import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { HttpParams, HttpHeaders } from '@angular/common/http';

// import { MatTableDataSource, MatInput } from '@angular/material';
import { FormGroup , FormControl } from '@angular/forms';
// import { SharedPegaDataService } from '../_services/sharedpegadata.service';
import { Sort } from '@angular/material';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
// import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { DatapageService } from '../../../_services/datapage.service';
import { ChartType, ChartOptions, ChartDataSets  } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

export interface OpenWorkType {
  pxObjClass: string;
  pyLabel: string;
  ResultCount1: number;
  StringVal1: number;
}

@Component({
  selector: 'app-open-by-work-type',
  templateUrl: './open-by-work-type.component.html',
  styleUrls: ['./open-by-work-type.component.scss'],
  animations: [routerTransition()]
})
export class OpenByWorkTypeComponent implements OnInit, AfterViewInit  {

  constructor(
    private datapage: DatapageService,
  ) { }
  message: any;
  // subscription: Subscription;
  displayedColumns = ['pyLabel', 'StringVal1', 'ResultCount1'];

  public dataSource = new MatTableDataSource<OpenWorkType>();
  sortedData: OpenWorkType[];
  headers: any;
  types: OpenWorkType[] = [];
  showLoading = true;
  filterValues = {
    pxObjClass: '',
    pyLabel: '',
    ResultCount1:  '',
    StringVal1: ''
  };

  // PIE Chart Settings
//   public pieChartLabels: Label[] = [
//     'Work Type',
//     'Status',
//     '# Entries'
// ];
public pieChartLabels: Label[] = [];
public pieChartData: SingleDataSet = [];

public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'right'
  }
};
public pieColors = [
  {
    backgroundColor: [
      'rgba(110, 114, 20, 1)',
      'rgba(118, 183, 172, 1)',
      'rgba(0, 148, 97, 1)',
      'rgba(129, 78, 40, 1)',
      'rgba(129, 199, 111, 1)',
      'rgba(223, 199, 111, .5)'
  ]
  }
];

public barChartOptions: ChartOptions = {
  responsive: true,
  // We use these empty structures as placeholders for dynamic theming.
  scales: { xAxes: [{}], yAxes: [{}] },
  plugins: {
    datalabels: {
      anchor: 'end',
      align: 'end',
    }
  }
};
public barChartLabels: Label[] = [];
// public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

// public barChartData: SingleDataSet = [];

public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [pluginDataLabels];

public barChartData: ChartDataSets[] = [
  // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' }
];


public show = false;
public showPieChart = true;
public showBarChart = false;
public showTable = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 // events
 public chartClicked(e: any): void {
  // console.log(e);
}

public chartHovered(e: any): void {
  // console.log(e);
}

  ngOnInit() {
    this.getCases();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sortedData = this.types.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getCases() {
    // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
    const dParams = new HttpParams();
    this.showLoading = true;
     this.datapage.getDataPage('D_OpenWorkByType', dParams).subscribe(
       response => {

         const resSTR = JSON.stringify(this.getResults(response.body));
         const resJSON = JSON.parse(resSTR);

         this.headers = response.headers;
         this.types = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);

         this.dataSource.data = this.types as OpenWorkType[];

         localStorage.setItem('D_OpenWorkByType', this.types.length.toString());
         this.parseDataForPieChart(this.types);
         this.parseDataForBarChart(this.types);
         this.pieChartType = 'pie';

         this.showLoading = false;

         console.log('count of D_OpenWorkByType-->  ', localStorage.getItem('D_OpenWorkByType'));
         console.log('D_OpenWorkByType-->  ' + JSON.stringify(this.types));

       },
       err => {
         alert('Error form unifiedtask:' + err.errors);
       }
     );
   }
   getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


  parseDataForPieChart (data) {

    for (const item of data) {
      this.pieChartData.push(item.ResultCount1);
     console.log(this.pieChartData); // Does not return anything
    }
    for (const item of data) {
      this.pieChartLabels.push(item.pyLabel);
      console.log('  Pie CHART DATA-->' + JSON.stringify(this.pieChartData)); // Does not return anything
    }
  }

  parseDataForBarChart (data) {
    // let barEntry = { "data": [], "label":""};

    for (const item of data) {
      const barEntry = { 'data': [], 'label': ''};
     barEntry.data.push(item.ResultCount1);
     barEntry.label = item.pyLabel;

      this.barChartData.push(barEntry);

     console.log('  BAR CHART DATA-->' + JSON.stringify(this.barChartData)); // Does not return anything
    }
    // for (const item of data) {
    //   this.pieChartLabels.push(item.pyLabel);
    //  console.log(this.pieChartData); // Does not return anything
    // }
  }
  changeLegendPosition() {
    // console.log(' before legend change-->' + this.pieChartOptions.legend.position );
    // this.pieChartOptions.legend.position = this.pieChartOptions.legend.position === 'bottom' ? 'top' : 'bottom';
   // this.pieChartOptions.label.position = this.pieChartOptions.label.position === 'bottom' ? 'top' : 'bottom';
// console.log(' after legend change-->' + this.pieChartOptions.legend.position);


}

toggle(event) {
  this.show = !this.show;
  console.log(' CLICKED ICON -->' + event.currentTarget.id);
  const options = ['pie', 'table'];

  if (event.currentTarget.id === 'bar') {
    this.showBarChart = true;
    this.showPieChart = false;
    this.showTable = false;
  }
  if (event.currentTarget.id === 'pie') {
    this.showBarChart = false;
    this.showPieChart = true;
    this.showTable = false;
  }
  if (event.currentTarget.id === 'table') {
    this.showBarChart = false;
    this.showPieChart = false;
    this.showTable = true;
  }


  // CHANGE THE NAME OF THE BUTTON.
  // if(this.show)
  //   this.buttonName = "Hide";
  // else
  //   this.buttonName = "Show";
}

}
