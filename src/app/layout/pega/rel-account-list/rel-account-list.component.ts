import { AccountSummary } from './../kpi-report/account-summary/account-summary.component';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatapageService } from '../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import stubbedResults from '@ss/json/D_RelAccountList.json';
import { TooltipPosition } from '@angular/material';
import { AccountListService } from '@ss/app/layout/pega/_services/index';

export interface RelAccount {
  AccountBalance: number;
  AccountNumber: number;
  AverageMonthlyBalance: number;
  Appl: number;
  // AccountBalance: number;
  // Appl: number;
  // Appl: number;
  // Appl: number;
  AccountNickname: string;
  AccountOpenDate: string;
  AccountStatusDesc: string;
  AccountSubStatusDesc: string;
  AccountSubStat: number;
  ComplianceStatus: string;
  FeeStructure: string;
  AccountType: string;
  ApplDesc: string;
  ApplDescType: string;
  pyDescription: string;

  AccountTrend: number;
  // pyStatusWorkTimestamp: string;
  // pxCreateDateTime: string;
  // pxUpdateDateTime: string;
  // pxUrgencyWork: number;
  // pxUrgencyWorkClass: number;
  // pxUrgencyWorkSLA: number;
  // pyLabel: string;
  // pyStatusWork: string;
  // pzInsKey: string;
}


export interface AccountsSummary {
  totalCurrentAssets: number;
  totalAvgMonthAssets: number;
  totalCurrentLiabilities: number;
  totalAvgMonthLiabilities: number;
}

@Component({
  selector: 'app-rel-account-list',
  templateUrl: './rel-account-list.component.html',
  styleUrls: ['./rel-account-list.component.scss']
})
export class RelAccountListComponent implements OnInit {
  componentName = 'rel-account-list.component';
  pegaService = 'D_RelAccountList';
  message: any;
  subscription: Subscription;
  showLoading = true;
  public dataSource = new MatTableDataSource<RelAccount>();
  sortedData: RelAccount[];
  headers: any;
  cases: RelAccount[] = [];
  displayedColumns = ['AccountNumber', 'AccountTypeDesc', 'AverageMonthlyBalance', 'AccountTrend', 'AccountBalance'];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  accountSummary:  AccountsSummary = <AccountsSummary>{};

  totalCurrentAssets = 0;
  totalAvgMonthAssets = 0;
  totalCurrentLiabilities = 0;
  totalAvgMonthLiabilities = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private datapage: DatapageService,
    private as: AccountListService
  ) { }

  ngOnInit() {
    if (this.checkIfStubbed()) {
      console.log(this.componentName + ' -- STUBBED ' + this.pegaService);
      this.getStubbedCases();
    } else {
      console.log(this.componentName + ' -- LIVE ' + this.pegaService);
      // this.getCases();
      this.getCases();
    }

    // console.log('count of ' + this.pegaService + '-->' + localStorage.getItem(this.pegaService));

  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  }
  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    // useStub = true;
    useStub = (useStubStr === 'true');

    useStub = true;
    return useStub;
  }
  getStubbedCases() {
    const stubbed: any = stubbedResults;
    this.cases = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
    // this.sortedData = this.cases.slice();
    this.parseRelAccountList();
    this.dataSource.data = this.cases as RelAccount[];
    // this.dataSource.filterPredicate = this.createFilter();
    localStorage.setItem(this.pegaService, this.cases.length.toString());
    this.showLoading = false;
  }
  sendMessage(): void {
    // send message to subscribers via observable subject
    this.as.sendMessage('Message from Home Component to App Component!');
}

clearMessages(): void {
    // clear messages
    this.as.clearMessages();
}
  getCases() {
    let dParams = new HttpParams();
    dParams = dParams.append('CifNbr', '9912345999');
    dParams = dParams.append('Marketsegmentid', '5');
    dParams = dParams.append('ReturnNullIfEmpty', 'true');


    this.datapage.getDataPage(this.pegaService, dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        this.parseRelAccountList();
        this.dataSource.data = this.cases as RelAccount[];
        // this.dataSource.filterPredicate = this.createFilter();
        localStorage.setItem(this.pegaService, this.cases.length.toString());
        this.showLoading = false;
      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
  }

  parseRelAccountList() {
    let totCurrAsset = this.totalCurrentAssets * 1;
    let totAvgMonthAsset = this.totalAvgMonthAssets * 1;

    let totCurrLiab = this.totalCurrentLiabilities * 1;
    let totAvgMonthLiab = this.totalAvgMonthLiabilities * 1;

    this.cases.forEach((element) => {
      // let  acctBal = element.AccountBalance * 1;
      const currentBal = element.AccountBalance * 1;
      let avgMonthBal = 0;

      // element.AverageMonthlyBalance * 1;

      // let acctBal = +element.AccountBalance;

      if (isNaN(element.AverageMonthlyBalance)) {
        avgMonthBal = 0;
        element.AverageMonthlyBalance = 0;
      } else {
        avgMonthBal = element.AverageMonthlyBalance * 1;
      }


      if (element.ApplDesc === 'Card' || element.ApplDesc === 'Loan') {
        element.ApplDescType = 'Liability';
        const cb = 0 - currentBal;
        const ab = 0 - avgMonthBal;

        element.AccountBalance = cb;
        element.AverageMonthlyBalance = ab;

        totCurrLiab = totCurrLiab + cb;
        totAvgMonthLiab = totAvgMonthLiab + ab;

      } else {
        // const cb = 0 - currentBal;
        // const ab = 0 - avgMonthBal;
        element.ApplDescType = 'Asset';
        totCurrAsset = totCurrAsset + currentBal;
        totAvgMonthAsset = totAvgMonthAsset + avgMonthBal;

      }


      // if (isNaN(currentBal)) {
      //   currentBal = 0;
      // }




      // const result = currentBal - monthBal;

      const trend = this.computeTrend(currentBal, avgMonthBal, element.ApplDescType);
      // if (result > 0) {
      //   trend = 1;
      // } else if ( result < 0 ) {
      //   trend = -1;
      // }
      element.AccountTrend = trend;
      // console.log('trans -->' + result + ' = ' +  currentBal + ' - ' + monthBal + ' = ' + result + '   trend -->' + element.AccountTrend);
    });
    console.log('total assets -->' + totCurrAsset);
    console.log('total liab   -->' + totCurrLiab);
    console.log('total avg assets -->' + totAvgMonthAsset);
    console.log('total avgt liab  -->' + totAvgMonthLiab);

    this.accountSummary.totalCurrentAssets = totCurrAsset;
    this.accountSummary.totalCurrentLiabilities = totCurrLiab;
    this.accountSummary.totalAvgMonthAssets = totAvgMonthAsset;
    this.accountSummary.totalAvgMonthLiabilities = totAvgMonthLiab;

    this.as.setAccountList(this.accountSummary);

    this.as.setUserDisplayName('Stella Turner');

    this.totalCurrentAssets = totCurrAsset;
    this.totalAvgMonthAssets = totAvgMonthAsset;
    this.totalCurrentLiabilities = totCurrLiab;
    this.totalAvgMonthLiabilities = totAvgMonthLiab;

    localStorage.setItem('totalCurrentLiabilities', totCurrLiab.toString());
    localStorage.setItem('totalAvgMonthLiabilities', totAvgMonthLiab.toString());
    localStorage.setItem('totalCurrentAssets', totCurrAsset.toString());
    localStorage.setItem('totalAvgMonthAssets', totAvgMonthAsset.toString());
  }

  computeTrend(currentBal, monthBal, type): number {
    const result = currentBal - monthBal;
    let trend = 0;
    if (result > 0) {
      trend = 1;
    } else if (result < 0) {
      trend = -1;
    }
    if (type === 'Liability') {
      // trend = 0 - trend;
    }

    return trend;

  }




  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.pyLabel.toLowerCase().indexOf(searchTerms.AccountTypeDesc) !== -1;
      // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
      // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
      // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
    return filterFunction;
  }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }

}

