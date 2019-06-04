import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';

import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Sort } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import { FormControl } from '@angular/forms';
import { DatapageService } from '../../../../_services/datapage.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import stubbedResults from '@ss/json/D_GetEmailsByCategory.json';


@Component({
  selector: 'app-email-by-category',
  // templateUrl: './email-by-category.component.html',
  templateUrl: './email-by-category.component.html',
  styleUrls: ['./email-by-category.component.scss'],
  animations: [routerTransition()]
})
export class EmailByCategoryComponent implements OnInit {

  constructor(
    private datapage: DatapageService
  ) {
  }

  componentName = 'kpi/email-by-category.component';
  message: any;
  // subscription: Subscription;
  displayedColumns = ['Name', 'pxIndexCount'];

  public dataSource = new MatTableDataSource<EmailByCategory>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatSort) set content(sort: MatSort) {
    this.dataSource.sort = sort;
}
  sortedData: EmailByCategory[];
  headers: any;
  types: EmailByCategory[] = [];
  showLoading = false;
  filterValues = {
    Name: '',
    pxIndexCount: ''
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
      pointBorderColor: 'black',
      backgroundColor: [
        'rgba(129, 199, 111, 1)',
        'rgba(223, 199, 111, .5)',
        'rgba(110, 114, 20, 1)',
        'rgba(118, 183, 172, 1)',
        'rgba(0, 148, 97, 1)',
        'rgba(129, 78, 40, 1)'
      ]
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
    this.showLoading = true;
    this.dataSource.sort = this.sort;
    this.sort.disableClear = true;

  }

  ngAfterViewInit() {

    if (this.checkIfStubbed()) {
      console.log('STUBBED D_GetEmailsByCategory');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_GetEmailsByCategory');
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
    console.log('entered STUBBED D_GetEmailsByCategory-->  ');
    const stubbed: any = stubbedResults;
    this.types = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);

    this.dataSource.data = this.types as EmailByCategory[];
    localStorage.setItem('D_GetEmailsByCategory', this.types.length.toString());
    this.parseDataForPieChart(this.types);
    this.parseDataForBarChart(this.types);
    this.pieChartType = 'pie';
    this.dataSource.sort = this.sort;
    this.showLoading = false;
    console.log('count of STUBBED D_GetEmailsByCategory-->  ', localStorage.getItem('D_GetEmailsByCategory'));

  }



  getCases() {
    console.log('entered live D_GetEmailsByCategory-->  ');
    // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
    const dParams = new HttpParams();
    this.showLoading = true;
    this.datapage.getDataPage('D_GetEmailsByCategory', dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.types = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        this.dataSource.data = this.types as EmailByCategory[];
        localStorage.setItem('D_GetEmailsByCategory', this.types.length.toString());
        this.parseDataForPieChart(this.types);
        this.parseDataForBarChart(this.types);
        this.pieChartType = 'pie';
        this.dataSource.sort = this.sort;
        this.showLoading = false;
        console.log('count of D_GetEmailsByCategory-->  ', localStorage.getItem('D_GetEmailsByCategory'));
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
    let stringArray = '[';
    let count = 0;
    for (const item of data) {
      if (count !== 0) {
        stringArray = stringArray + ',';
      }
      // const itemValue: number = item.ResultCount1;
      // let foo: ;
      // stringArray = item.ResultCount1;
      // this.itemNumberValue = item.ResultCount1;
      stringArray = stringArray + item.pxIndexCount;
      count++;
      // this.pieChartData.push(foo);
    }
    stringArray += ']';
    this.pieChartData = JSON.parse(stringArray);

    // console.log('  Pie CHART pieChartData-->' + JSON.stringify(this.pieChartData)); // Does not return anything
    // this.pieChartData = [13, 24, 45, 76, 56];
    for (const item of data) {
      this.pieChartLabels.push(item.Name);
    }
    // console.log('  Pie CHART pieChartLabels-->' + JSON.stringify(this.pieChartLabels)); // Does not return anything
  }

  parseDataForBarChart(data) {
    // let barEntry = { "data": [], "label":""};


    for (const item of data) {
      const barEntry = { 'data': [], 'label': '' };
      barEntry.data.push(item.pxIndexCount);
      barEntry.label = item.Name;
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
export interface EmailByCategory {
  Name: string;
  pxIndexCount: number;
  pxObjClass: string;
}
