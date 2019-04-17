import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

// import { MatTableDataSource, MatInput } from '@angular/material';
import { FormGroup , FormControl } from '@angular/forms';
import { SharedPegaDataService } from '../_services/sharedpegadata.service';
import { Sort } from '@angular/material';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
// import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';
import { DatapageService } from '../../../_services/datapage.service';

export interface Transactions {
  AccountNumber: string;
  Appl: number;
  AVSResponseCode: string;
  CardNumber: number;
  CashPortion: number;
  CentralProcessingDate: string;
  DepositAccountNumber: number;
  FeeAmount: string;
  FeeTypeDescription: string;
  FloorLimitAmount: number;
  MerchantCategoryCodeDesc:  string;
  MerchantDBAName: string;
  MerchantName: string;
  pxObjClass: string;
  TotalTrxnAmount: number;
  TransactionAmount: number;
  TransactionCode: string;
  TransactionDate: string;
  TransactionDescription: string;
  TransactionPostDate: string;
  TransactionSeq: number;
  TransactionType: number;
}

@Component({
  selector: 'app-transaction-summary',
  templateUrl: './transaction-summary.component.html',
  styleUrls: ['./transaction-summary.component.scss']
})
export class TransactionSummaryComponent implements OnInit, AfterViewInit {
  message: any;
  // subscription: Subscription;
  displayedColumns = ['AccountNumber', 'TransactionDescription', 'TransactionCode', 'TransactionPostDate', 'TransactionAmount'];
  public dataSource = new MatTableDataSource<Transactions>();
  sortedData: Transactions[];
  headers: any;
  cases: Transactions[] = [];
  showLoading = true;

  nameFilter = new FormControl('');

  // columnsToDisplay = ['AccountNumber', 'TransactionDescription', 'TransactionCode',  'TransactionPostDate', 'TransactionAmount'];
  filterValues = {
    AccountNumber: '',
    TransactionDescription: '',
    TransactionCode:  '',
    TransactionPostDate: '',
    TransactionAmount: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private datapage: DatapageService,

  ) {
    // this.dataSource.data = this.people;
   // this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.getCases();

  }


  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  getCases() {
    // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
    const dParams = new HttpParams();
    this.showLoading = true;
     this.datapage.getDataPage('D_TransactionSummary', dParams).subscribe(
       response => {

         // console.log(' get D_RecentTreasurerCases -->' + JSON.stringify(response.body));
         const resSTR = JSON.stringify(this.getResults(response.body));
         const resJSON = JSON.parse(resSTR);
         // console.log(' get D_RecentTreasurerCases-->', resJSON._body);
         // this.unifiedtask$ = new MatTableDataSource<any>(this.getResults(response.body));
         this.headers = response.headers;
         // this.unifiedtaskObject$ = JSON.parse(this.getResults(response.body));
         this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
         // this.cases = JSON.parse(response.body);
        // this.sortedData = this.cases.slice();
         this.dataSource.data = this.cases as Transactions[];
         // this.dataSource.filterPredicate = this.createFilter();

         localStorage.setItem('D_TransactionSummary', this.cases.length.toString());

         this.showLoading = false;
        // this.sortedData = this.cases.slice();
         // this.ngAfterViewInit();


         console.log('count of D_TransactionSummary-->  ', localStorage.getItem('D_TransactionSummary'));

         // this.unifiedtask$.paginator = this.paginator;
         // this.unifiedtask$.sort = this.sort;

         // this.p_TotalNumberItems = this.cases.length;
         // this.initPagingInfo();
         // this.p_CurrentList = this.cases.slice(0, this.p_ItemsPerPage);
         // initialize to page 1
         // this.setPage(0);

       },
       err => {
         alert('Error form unifiedtask:' + err.errors);
       }
     );
   }

   public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }
  // createFilter(): (data: any, filter: string) => boolean {
  //   const filterFunction = function(data, filter): boolean {

  //     console.log(' createFilter() filter-->' + JSON.parse(filter));
  //     const searchTerms = JSON.parse(filter);
  //     console.log (' createFilter()  searchTerms--> ' + searchTerms);

  //     return data.name.toLowerCase().indexOf(searchTerms.name) !== -1;
  //       // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
  //       // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
  //       // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
  //   };
  //   return filterFunction;
  // }

  // applyFilter(filterValue: string) {

  //   console.log('  filtering on -->' + filterValue);
  //   console.log('    filter -->' +  this.filterGroup.value);
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   this.dataSource.filterPredicate = this.createFilter();
  //   }
    getResults(data) {
      // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
      return data.pxResults;
    }


}
