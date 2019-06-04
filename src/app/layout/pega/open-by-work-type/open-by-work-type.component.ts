import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

import { HttpParams, HttpHeaders } from '@angular/common/http';

// import { MatTableDataSource, MatInput } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';
// import { SharedPegaDataService } from '../_services/sharedpegadata.service';
import { Sort } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { DatapageService } from '../../../_services/datapage.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import stubbedResults from '@ss/json/D_OpenByWorkType.json';

export interface OpenWorkType {
  pxObjClass: string;
  pyLabel: string;
  StringVal1: number;
  ResultCount1: number;
}

@Component({
  selector: 'app-open-by-work-type',
  templateUrl: './open-by-work-type.component.html',
  styleUrls: ['./open-by-work-type.component.scss'],
  animations: [routerTransition()]
})
export class OpenByWorkTypeComponent implements OnInit, AfterViewInit {

  constructor(
    private datapage: DatapageService,
  ) { }
  componentName = 'open-work-by-work-type.component';
  message: any;
  // subscription: Subscription;
  displayedColumns = ['pyLabel', 'StringVal1', 'ResultCount1'];

  public dataSource = new MatTableDataSource<OpenWorkType>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) set content(sort: MatSort) {
    this.dataSource.sort = sort;
}
  sortedData: OpenWorkType[];
  headers: any;
  types: OpenWorkType[] = [];
  showLoading = true;
  filterValues = {
    pyLabel: '',
    ResultCount1: '',
    StringVal1: ''
  };

//   for chart parsing
itemNumberValue: number;
itemTextValue: string;

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
      pointBorderColor: 'black',
      backgroundColor: [
        'rgba(47, 59, 84, 1)',
        'rgba(147, 207, 222, 1)',
        'rgba(123, 177, 180, 1)',
        'rgba(139, 104, 67, 1)',
        'rgba(18, 121, 127, 1)',
        'rgba(39, 76, 94,1)',
        'rgba(233,234,234,1)',
        'rgba(40,75,96,0.7)',
        'rgba(176,136,99,1)',
        'rgba(151,131,99,0.4)'
      ]
      // backgroundColor: [
      //   'rgba(110, 114, 20, 1)',
      //   'rgba(118, 183, 172, 1)',
      //   'rgba(0, 148, 97, 1)',
      //   'rgba(129, 78, 40, 1)',
      //   'rgba(129, 199, 111, 1)',
      //   'rgba(223, 199, 111, .5)'
      // ]
    }
  ];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      xAxes: [{}]
      , yAxes: [
        {
          ticks: {
            // max : 60,
            min: 0
          }
        }
      ]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    },
    legend: {
      position: 'right',
    labels: {
      fontSize: 10
    }}
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

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  ngOnInit() {
    // this.getCases();
    this.dataSource.sort = this.sort;
    // this.sort.disableClear = true;
  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // this.sortedData = this.types.slice();
     this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
    // this.getCases();
    if (this.checkIfStubbed()) {
      console.log('STUBBED D_OpenWorkByType');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_OpenWorkByType');
      this.getCases();
    }

  }

  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');
    let useStub = false;
    useStub = (useStubStr === 'true');
    return useStub;
  }

  getStubbedCases() {
    const stubbed: any = stubbedResults;
    this.types = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);

        this.dataSource.data = this.types as OpenWorkType[];
        localStorage.setItem('D_OpenWorkByType', this.types.length.toString());
        this.parseDataForPieChart(this.types);
        this.parseDataForBarChart(this.types);
        this.pieChartType = 'pie';
        this.dataSource.sort = this.sort;
        this.showLoading = false;
        console.log('count of STUBBED D_OpenWorkByType-->  ', localStorage.getItem('D_OpenWorkByType'));
  }

  getCases() {
    // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
    const dParams = new HttpParams();
    this.showLoading = true;
    this.datapage.getDataPage('D_OpenWorkByType', dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.types = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        this.dataSource.data = this.types as OpenWorkType[];
        localStorage.setItem('D_OpenWorkByType', this.types.length.toString());
        this.parseDataForPieChart(this.types);
        this.parseDataForBarChart(this.types);
        this.pieChartType = 'pie';
        this.dataSource.sort = this.sort;
        this.showLoading = false;
        console.log('count of D_OpenWorkByType-->  ', localStorage.getItem('D_OpenWorkByType'));
      },
      err => {

        alert('Error from ' + this.componentName + ':' + err.errors);

      }
    );
  }
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.sort = this.sort;
  }


  parseDataForPieChart(data) {
    // tslint:disable-next-line:prefer-const
    let  stringArray = '[';
let count = 0;
    for (const item of data) {
      if (count !== 0 ) {
        stringArray = stringArray + ',';
      }
      // const itemValue: number = item.ResultCount1;
      // let foo: ;
      // stringArray = item.ResultCount1;
      // this.itemNumberValue = item.ResultCount1;
      stringArray = stringArray + item.ResultCount1;
      count++;
      // this.pieChartData.push(foo);
    }
    stringArray += ']';
    this.pieChartData = JSON.parse(stringArray);

    // console.log('  Pie CHART pieChartData-->' + JSON.stringify(this.pieChartData)); // Does not return anything
    // this.pieChartData = [13, 24, 45, 76, 56];
    for (const item of data) {
      this.pieChartLabels.push(item.pyLabel);
    }
    // console.log('  Pie CHART pieChartLabels-->' + JSON.stringify(this.pieChartLabels)); // Does not return anything
  }

  parseDataForBarChart(data) {
    // let barEntry = { "data": [], "label":""};


    for (const item of data) {
      const barEntry = { 'data': [], 'label': '' };
      barEntry.data.push(item.ResultCount1);
      barEntry.label = item.pyLabel;
      this.barChartData.push(barEntry);
    }
    // console.log('  BAR CHART barChartData-->' + JSON.stringify(this.barChartData)); // Does not return anything

  }

  toggle(event) {
    this.show = !this.show;
    // console.log(' CLICKED ICON -->' + event.currentTarget.id);
    const options = ['pie', 'bar', 'table'];

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
