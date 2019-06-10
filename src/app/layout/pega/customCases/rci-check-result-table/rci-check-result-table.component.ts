import { Component, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { DatapageService } from '../../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import stubbedResults from '@ss/json/D_RCIChequeDetails_NewWaveEnergy.json';
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
  componentName = 'rci-check-result-table.component';

  @Input('recName') myRecName: string;
  @Input('checkAm') myCheckAm: number;

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

/*
*
*  Column Filtering
*/

customerNameFilter = new FormControl('');
accontNumberFilter = new FormControl('');
cibNbrFilter = new FormControl('');
dateFilter = new FormControl('');
chequeNumberFilter = new FormControl('');
depositAmountFilter = new FormControl('');
filterValues = {
  CustomerName: '',
  AccountNumber: '',
  CifNbr: '',
  CheckDate: '',
  ChequeNumber: '',
  DepositAmount: ''
};


  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private datapage: DatapageService
  ) {
    this.dataSource.data = this.cases;
    this.dataSource.filterPredicate = this.createFilter();
   }

  ngOnInit() {
    this.customerNameFilter.valueChanges
    .subscribe(
      CustomerName => {
        this.filterValues.CustomerName = CustomerName;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
      );
    this.accontNumberFilter.valueChanges
    .subscribe(
      AccountNumber => {
        this.filterValues.AccountNumber = AccountNumber;
        console.log('  RciCheckResultTableComponent - AccountNbr - ngOnInit -->' + AccountNumber);
        console.log('  RciCheckResultTableComponent - AccountNbr - ngOnInit -->' + JSON.stringify(this.filterValues));

        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
      );
      this.cibNbrFilter.valueChanges
      .subscribe(
        CifNbr => {
          this.filterValues.CifNbr = CifNbr;
          console.log('  RciCheckResultTableComponent - CifNbr - ngOnInit -->' + CifNbr);
          console.log('  RciCheckResultTableComponent - CifNbr - ngOnInit -->' + JSON.stringify(this.filterValues));
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );
      this.dateFilter.valueChanges
      .subscribe(
        CheckDate => {
          this.filterValues.CheckDate = CheckDate;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );
      this.chequeNumberFilter.valueChanges
      .subscribe(
        ChequeNumber => {
          this.filterValues.ChequeNumber = ChequeNumber;
         this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );
      this.depositAmountFilter.valueChanges
      .subscribe(
        DepositAmount => {
          this.filterValues.DepositAmount = DepositAmount;
         this.dataSource.filter = JSON.stringify(this.filterValues);
      }
    );


  }
  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function(data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.CustomerName.toLowerCase().indexOf(searchTerms.CustomerName) !== -1
        && data.AccountNumber.toLowerCase().indexOf(searchTerms.AccountNumber) !== -1
        && data.CifNbr.toString().toLowerCase().indexOf(searchTerms.CifNbr) !== -1
        && data.CheckDate.toString().toLowerCase().indexOf(searchTerms.CheckDate) !== -1
        && data.ChequeNumber.toString().toLowerCase().indexOf(searchTerms.ChequeNumber) !== -1
        && data.DepositAmount.toString().toLowerCase().indexOf(searchTerms.DepositAmount) !== -1;
        // && data.CifNbr.toString().toLowerCase().indexOf(searchTerms.CifNbr) !== -1
        // && data.CifNbr.toString().toLowerCase().indexOf(searchTerms.CifNbr) !== -1
        // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
    return filterFunction;
  }
  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = this.createFilter();

    // this.dataSource.paginator = this.paginator;
    if (this.checkIfStubbed()) {

      console.log('STUBBED D_RCIChequeDetails');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_RCIChequeDetails');
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
        alert('Error form ' + this.componentName + ':' + err.errors);
      }
    );
  }
  // createFilter(): (data: any, filter: string) => boolean {
  //   const filterFunction = function(data, filter): boolean {
  //     const searchTerms = JSON.parse(filter);
  //     return data.pyLabel.toLowerCase().indexOf(searchTerms.CustomerName) !== -1;
  //       // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
  //       // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
  //       // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
  //   };
  //   return filterFunction;
  // }
  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }

}
