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
  pyDescription: string;


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
  message: any;
  subscription: Subscription;
  showLoading = true;
  public dataSource = new MatTableDataSource<RelAccount>();
  sortedData: RelAccount[];
  headers: any;
  cases: RelAccount[] = [];
  displayedColumns = ['AccountNumber',  'AccountTypeDesc', 'AverageMonthlyBalance', 'BI', 'AccountBalance'];

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
    useStub = (useStubStr === 'true');
    return useStub;
  }
  getStubbedCases() {
    const stubbed: any = stubbedResults;
    this.cases = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
   // this.sortedData = this.cases.slice();
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
        this.dataSource.data = this.cases as RelAccount[];
        // this.dataSource.filterPredicate = this.createFilter();
        localStorage.setItem('D_RelAccountList', this.cases.length.toString());
        console.log('count of D_RelAccountList-->  ', localStorage.getItem('D_RelAccountList'));
        this.showLoading = false;
      },
      err => {
        alert('Error form unifiedtask:' + err.errors);
      }
    );
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

