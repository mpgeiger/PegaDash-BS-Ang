import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatapageService } from '../../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import stubbedResults from '../../../../../assets/json/D_RCIChequeDetails_NewWaveEnergy.json';
import {TooltipPosition} from '@angular/material';

export interface ChequeInfo {
  AccountNumber: number;
  CheckDate: string;
  ChequeImagePath: string;
  ChequeNumber: string;
  CifNbr: number;
  CustomerName: string;
  DepositAmount: number;
  pxObjClass: string;
}


@Component({
  selector: 'app-rci-check-result-table',
  templateUrl: './rci-check-result-table.component.html',
  styleUrls: ['./rci-check-result-table.component.scss']
})
export class RciCheckResultTableComponent implements OnInit {
  message: any;
  subscription: Subscription;
  showLoading = true;
  public dataSource = new MatTableDataSource<ChequeInfo>();
  sortedData: ChequeInfo[];
  headers: any;
  cases: ChequeInfo[] = [];
  displayedColumns = ['CustomerName', 'AccountNumber', 'CifNbr', 'CheckDate', 'ChequeNumber', 'DepositAmount'];

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
    this.dataSource.data = this.cases as ChequeInfo[];
    // this.dataSource.filterPredicate = this.createFilter();
    localStorage.setItem('D_RCIChequeDetails', this.cases.length.toString());
    console.log('count of D_RCIChequeDetails-->  ', localStorage.getItem('D_RCIChequeDetails'));
    this.showLoading = false;

  }

  getCases() {
   let dParams = new HttpParams();
  //  dParams = dParams.append('CifNbr', '9912345999');
   dParams = dParams.append('CustomerName', 'New Wave Energy');
  //  dParams = dParams.append('ReturnNullIfEmpty', 'true');


    this.datapage.getDataPage('D_RCIChequeDetails', dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        this.dataSource.data = this.cases as ChequeInfo[];
        // this.dataSource.filterPredicate = this.createFilter();
        localStorage.setItem('D_RCIChequeDetails', this.cases.length.toString());
        console.log('count of D_RCIChequeDetails-->  ', localStorage.getItem('D_RCIChequeDetails'));
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
      return data.pyLabel.toLowerCase().indexOf(searchTerms.CustomerName) !== -1;
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
