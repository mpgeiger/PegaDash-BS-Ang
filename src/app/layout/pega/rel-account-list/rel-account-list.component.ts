import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatapageService } from '../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import stubbedResults from '../../../../assets/json/D_RelAccountList.json';
import {TooltipPosition} from '@angular/material';

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





@Component({
  selector: 'app-rel-account-list',
  templateUrl: './rel-account-list.component.html',
  styleUrls: ['./rel-account-list.component.scss']
})
export class RelAccountListComponent implements OnInit {
  componentName = 'rel-account-list.component';

  message: any;
  subscription: Subscription;
  showLoading = true;
  public dataSource = new MatTableDataSource<RelAccount>();
  sortedData: RelAccount[];
  headers: any;
  cases: RelAccount[] = [];
  displayedColumns = ['AccountNumber',  'AccountTypeDesc', 'AverageMonthlyBalance', 'AccountTrend', 'AccountBalance'];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private datapage: DatapageService
  ) { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    // this.sort.disableClear = true;
    this.dataSource.paginator = this.paginator;
    if (this.checkIfStubbed()) {

      console.log('STUBBED D_RecentTreasurerCases');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_RecentTreasurerCases');
      this.getStubbedCases();
    }
  }
  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    useStub = true;
    useStub = (useStubStr === 'true');
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
    localStorage.setItem('D_RelAccountList', this.cases.length.toString());
    console.log('count of D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));
    this.showLoading = false;

  }

  getCases() {
   let dParams = new HttpParams();
   dParams = dParams.append('CifNbr', '9912345999');
   dParams = dParams.append('Marketsegmentid', '5');
   dParams = dParams.append('ReturnNullIfEmpty', 'true');


    this.datapage.getDataPage('D_RelAccountList', dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        this.parseRelAccountList();
        this.dataSource.data = this.cases as RelAccount[];

        // this.dataSource.filterPredicate = this.createFilter();
        localStorage.setItem('D_RelAccountList', this.cases.length.toString());
        console.log('count of D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));
        this.showLoading = false;
      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
  }

  parseRelAccountList() {
    this.cases.forEach( (element) => {
      let  monthBal = element.AverageMonthlyBalance;
      const currentBal = element.AccountBalance;

      if (element.ApplDesc === 'Card' || element.ApplDesc === 'Loan') {
        element.ApplDescType = 'Liability';
        element.AccountBalance = 0 - element.AccountBalance;
        element.AverageMonthlyBalance = 0 - element.AverageMonthlyBalance;
      } else {
        element.ApplDescType = 'Asset';
      }

      if (isNaN(monthBal)) {
        monthBal = 0;
        element.AverageMonthlyBalance = 0;
      }
      // if (isNaN(currentBal)) {
      //   currentBal = 0;
      // }


      // const result = currentBal - monthBal;

      const trend = this.computeTrend(currentBal, monthBal, element.ApplDescType);
      // if (result > 0) {
      //   trend = 1;
      // } else if ( result < 0 ) {
      //   trend = -1;
      // }
      element.AccountTrend = trend;
      // console.log('trans -->' + result + ' = ' +  currentBal + ' - ' + monthBal + ' = ' + result + '   trend -->' + element.AccountTrend);
  });
   }

   computeTrend(currentBal, monthBal, type): number {
    const result = currentBal - monthBal;


    let trend = 0;
    if (result > 0) {
      trend = 1;
    } else if ( result < 0 ) {
      trend = -1;
    }
    if (type === 'Liability') {
      // trend = 0 - trend;
    }

    return trend;

   }


  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {
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

