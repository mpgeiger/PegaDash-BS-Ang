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
import stubbedResults from '../../../../../assets/json/D_RelAccountList.json';

@Component({
  selector: 'app-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  animations: [routerTransition()]
})
export class AccountSummaryComponent implements OnInit {

  constructor(
    private datapage: DatapageService
  ) { }

  @ViewChild(MatSort) sort: MatSort;
  componentName = 'kpi/account-summary.component';
  message: any;
  // subscription: Subscription;
  // displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance', 'AverageMonthlyBalance', 'ComplianceStatus'];
  // displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance', 'ComplianceStatus'];
  displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance' ];
  public dataSource = new MatTableDataSource<AccountSummary>();
  sortedData: AccountSummary[];
  headers: any;
  types: AccountSummary[] = [];
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
  public showPieChart = false;
  public showBarChart = false;
  public showTable = true;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }


  ngOnInit() {
    if (this.checkIfStubbed()) {
      console.log('STUBBED D_RelAccountList');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_RelAccountList');
      this.getCases();
    }
    // this.showLoading = true;
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {

    // this.dataSource.sort = this.sort;
    // this.sort.disableClear = true;
    // if (this.checkIfStubbed()) {
    //   console.log('STUBBED D_RelAccountList');
    //   this.getStubbedCases();
    // } else {
    //   console.log('LIVE D_RelAccountList');
    //   this.getCases();
    // }

  }

  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');
    let useStub = false;
    useStub = (useStubStr === 'true');
   useStub = true;
    return useStub;
  }



  getStubbedCases() {
    console.log('entered STUBBED D_RelAccountList-->  ');
    const stubbed: any = stubbedResults;
    this.types = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);
  //  console.log (' KPI Account Summary -->' + JSON.stringify(this.types));

    this.dataSource.data = this.types as AccountSummary[];
    localStorage.setItem('D_RelAccountList', this.types.length.toString());
    // this.parseDataForPieChart(this.types);
    // this.parseDataForBarChart(this.types);
    this.pieChartType = 'pie';
    this.dataSource.sort = this.sort;
    this.showLoading = false;
    console.log('count of STUBBED D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));

  }



  getCases() {
    console.log('entered live D_RelAccountList-->  ');
    // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
    const dParams = new HttpParams();
    dParams.append('CifNbr', '9912345999' );
    dParams.append('Marketsegmentid', '5' );
    dParams.append('ReturnNullIfEmpty', 'true' );

    this.showLoading = true;
    this.datapage.getDataPage('D_RelAccountList', dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.types = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        this.dataSource.data = this.types as AccountSummary[];
        localStorage.setItem('D_RelAccountList', this.types.length.toString());
        // this.parseDataForPieChart(this.types);
        // this.parseDataForBarChart(this.types);
        this.pieChartType = 'pie';
        this.dataSource.sort = this.sort;
        this.showLoading = false;
        console.log('count of D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));
      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
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
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
    this.dataSource.sort = this.sort;
  }


}

// displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance', 'AverageMonthlyBalance', 'ComplianceStatus'];

export interface AccountSummary {
  AccountTypeDesc: string;
  AccountNickname: string;
  AccountBalance: number;
  AverageMonthlyBalance: string;
  ComplianceStatus: string;
}
