import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../../../router.animations';

import { HttpParams, HttpHeaders } from '@angular/common/http';

import { Sort } from '@angular/material';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
// import { FormControl } from '@angular/forms';
import { DatapageService } from '../../../../_services/datapage.service';
import { ChartType, ChartOptions, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { SingleDataSet, Label, MultiDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import stubbedResults from '@ss/json/D_TransactionSummaryInternational_KPI.json';
import { PegaVariablesPropertiesComponent } from '@ss/app/shared-pega/pega-variables-properties/pega-variables-properties.component';
// import stubbedResultsSummary from '@ss/json/D_TransactionSummaryInternational_KPI';
export interface TransactionSummaryKPI {
  Currency: string;
  Country: string;
  // AccountBalance: number;
  TotalTrxnAmount: number;
  TransactionAmount: number;
  // ComplianceStatus: string;
}


@Component({
  selector: 'app-transaction-summary-kpi',
  templateUrl: './transaction-summary-kpi.component.html',
  styleUrls: ['./transaction-summary-kpi.component.scss']
})
export class TransactionSummaryKpiComponent implements OnInit {


  componentName = 'kpi/account-summary.component';
  message: any;
  // subscription: Subscription;
  // displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance', 'AverageMonthlyBalance', 'ComplianceStatus'];
  // displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance', 'ComplianceStatus'];
  displayedColumns = ['Country', 'Currency', 'TransactionAmount' ];
  public dataSource = new MatTableDataSource<TransactionSummaryKPI>();
  @ViewChild(MatSort) set content(sort: MatSort) {
    this.dataSource.sort = sort;
}
  sortedData: TransactionSummaryKPI[];
  headers: any;
  types: TransactionSummaryKPI[] = [];
  showLoading = false;
  // filterValues = {
  //   Name: '',
  //   pxIndexCount: ''
  // };
  @ViewChild(MatSort) sort: MatSort;
  // stubbedSummary: any = stubbedResultsSummary;

  // PIE Chart Settings
  //   public pieChartLabels: Label[] = [
  //     'Work Type',
  //     'Status',
  //     '# Entries'
  // ];
  // public pieChartLabels: Label[] = [];

  chartColors = this.pv.rgbaPalette;
  public pieChartLabels: Label[] =  [ 'China', 'Hong Kong', 'Singapore', 'UAE', 'USA'];
  // public pieChartData: SingleDataSet = [];
  public pieChartData: SingleDataSet = [ 5634553, 534535, 43453540, 2434233, 32332323];
  public pieChartPlugins = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      display: true
    }
  };
  public pieColors = [
    {
      pointBorderColor: 'black',
      backgroundColor: this.chartColors
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
        display: false
      }
    },
    legend: {
      position: 'bottom',
      labels: {
        fontSize: 10
      }
    }
  };
  // public barChartLabels: Label[] = [];
  public barChartLabels: Label[] = [ 'China',  'Hong Kong',  'Singapore', 'Switzerland',  'USA'];
  // public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];

  // public barChartData: SingleDataSet = [];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
     { data: [ 5634553, 534535, 434535, 2434233, 3233232], label: 'Assets' },
     { data: [  3453456, 5534535, 4345340, 234234, 1717177], label: 'Liabilities' }

  ];


  public doughnutChartLabels: Label[] = ['China', 'HongKong', 'Singapore', 'UAE', 'USA'];
  public doughnutChartData: MultiDataSet = [
    [ 5634553, 534535, 434535, 2434233, 3233232],
    [  3453456, 5534535, 4345340, 234234, 1717177]
  ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
      display: false
    }
  };


  public show = false;
  public showPieChart = false;
  public showBarChart = true;
  public showTable = false;

  constructor(
    private datapage: DatapageService,
    private pv: PegaVariablesPropertiesComponent
    ) {
      // monkeyPatchChartJsTooltip();
      // monkeyPatchChartJsLegend();
    }

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }

  OnInit() {

  }

  ngOnInit() {
    if (this.checkIfStubbed()) {
      console.log('STUBBED D_RelAccountList');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_RelAccountList');
      this.getCases();
    }
    // this.sortData({active: 'urgency', direction: 'dec'});
    // this.showLoading = true;
    // this.dataSource.sort = this.sort;
  }
  ngAfterViewInit() {

     this.dataSource.sort = this.sort;
    //  this.sort.direction('dsc');
    //  this.sort.active('urgency');
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

    this.dataSource.data = this.types as TransactionSummaryKPI[];
    // localStorage.setItem('D_RelAccountList', this.types.length.toString());
    // this.parseDataForPieChart(this.types);
    // this.parseDataForBarChart(this.types);
    this.pieChartType = 'pie';

    this.showLoading = false;
    // console.log('count of STUBBED D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));

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
        this.dataSource.data = this.types as TransactionSummaryKPI[];
       // localStorage.setItem('D_RelAccountList', this.types.length.toString());
        // this.parseDataForPieChart(this.types);
        // this.parseDataForBarChart(this.types);
        // this.pieChartType = 'pie';
        // this.dataSource.sort = this.sort;
        this.showLoading = false;
       // console.log('count of D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));
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
 //   this.pieChartData = JSON.parse(stringArray);

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
 //     barEntry.data.push(item.pxIndexCount);
 //     barEntry.label = item.Name;
  //    this.barChartData.push(barEntry);
 // this.barChartData.push(barEntry);
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
  // public doFilter = (value: string) => {
  //   this.dataSource.filter = value.trim().toLocaleLowerCase();
  //   this.dataSource.sort = this.sort;
  // }


}

// displayedColumns = ['AccountTypeDesc', 'AccountNickname', 'AccountBalance', 'AverageMonthlyBalance', 'ComplianceStatus'];


