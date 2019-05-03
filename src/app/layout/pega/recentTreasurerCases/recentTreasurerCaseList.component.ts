// import { FormControl } from '@angular/forms';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DatapageService } from '../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { OpenAssignmentService } from '../../../_messages/openassignment.service';
import { RefreshWorkListService } from '../../../_messages/refreshworklist.service';
import { CaseService } from '../../../_services/case.service';
import { PagerService } from '../../../_services/pager.service';
import { SharedPegaDataService } from '../_services/sharedpegadata.service';
import { Sort } from '@angular/material';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { FormControl } from '@angular/forms';
import { stringify } from 'querystring';

import stubbedResults from '../../../../assets/json/D_RecentTreasurerCases.json';


export interface TreasurerCases {
  CaseStatusImage: string;
  CaseStatusStyler: string;
  pxCreateDateTime: string;
  pxObjClass: string;
  pxUpdateDateTime: string;
  pyID: string;
  pyLabel: string;
  pyStatusWork: string;
  pzInsKey: string;
}

@Component({
  selector: 'app-recentTreasurerCaseList',
  templateUrl: './recentTreasurerCaseList.component.html',
  styleUrls: ['./recentTreasurerCaseList.component.scss']
})
export class RecentTreasurerCaseListComponent implements OnInit, AfterViewInit  {
  message: any;
  subscription: Subscription;
  showLoading = true;

  // cases: Array<any> = [];
  // displayedColumns = ['pxRefObjectInsName', 'pyAssignmentStatus', 'pyLabel', 'pxUrgencyAssign'];
  // displayedColumns = ['ID', 'name', 'createTime', 'stage', 'status', 'createdBy'];
  displayedColumns = ['pyID', 'pyLabel', 'pyStatusWork', 'pxUpdateDateTime'];
  public dataSource = new MatTableDataSource<TreasurerCases>();
  sortedData: TreasurerCases[];
  headers: any;
  cases: TreasurerCases[] = [];

  pyLabelFilter = new FormControl('');
  pyIDFilter = new FormControl('');
  pyStatusWorkFilter = new FormControl('');
  pxUpdateDateTimeFilter = new FormControl('');
  filterValues = {
    pyID: '',
    pyLabel: '',
    pyStatusWork: '',
    pxUpdateDateTime: ''
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public cService: CaseService,
    private datapage: DatapageService,
    private oaservice: OpenAssignmentService,
    private rwlservice: RefreshWorkListService,
    // private createCase: CreateRCIcaseComponent,
    private pagerService: PagerService,
    public _pegaDataService: SharedPegaDataService
  ) {
    // this.getCases();
   // this.sortedData = this.cases.slice();
  }

  ngOnInit() {

    // this.pyLabelFilter.valueChanges
    // .subscribe(
    //   pyLabel => {
    //     this.filterValues.pyLabel = pyLabel;
    //     this.dataSource.filter = JSON.stringify(this.filterValues);
    //   }
    // );
    // this.getCases();

    // this.sortData();
    // this.dataSource = this.cases;
    // this.ngAfterViewInit();
  }

  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    useStub = (useStubStr === 'true');
    return useStub;
  }

  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    if (this.checkIfStubbed()) {

      console.log('STUBBED D_RecentTreasurerCases');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_RecentTreasurerCases');
      this.getCases();
    }
  }



  getStubbedCases() {
    const stubbed: any = stubbedResults;
    this.cases = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
   // this.sortedData = this.cases.slice();
    this.dataSource.data = this.cases as TreasurerCases[];
    // this.dataSource.filterPredicate = this.createFilter();
    localStorage.setItem('D_RecentTreasurerCases', this.cases.length.toString());
    console.log('count of D_RecentTreasurerCases-->  ', localStorage.getItem('D_RecentTreasurerCases'));
    this.showLoading = false;
  }


  getCases() {
    // cont; foo = useStubbedData;
   // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
   const dParams = new HttpParams();

    this.datapage.getDataPage('D_RecentTreasurerCases', dParams).subscribe(
      response => {


        this.headers = response.headers;
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);

        this.dataSource.data = this.cases as TreasurerCases[];
        // this.dataSource.filterPredicate = this.createFilter();


        localStorage.setItem('D_RecentTreasurerCases', this.cases.length.toString());

       // this.sortedData = this.cases.slice();
        // this.ngAfterViewInit();


        console.log('count of D_RecentTreasurerCases-->  ', localStorage.getItem('D_RecentTreasurerCases'));
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
      return data.pyLabel.toLowerCase().indexOf(searchTerms.pyLabel) !== -1;
        // && data.id.toString().toLowerCase().indexOf(searchTerms.id) !== -1
        // && data.colour.toLowerCase().indexOf(searchTerms.colour) !== -1
        // && data.pet.toLowerCase().indexOf(searchTerms.pet) !== -1;
    };
    return filterFunction;
  }


public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  // sortData(sort: Sort) {
  //   const data = this.cases.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       // displayedColumns = ['pyID', 'pyLabel', 'pyStatusWork', 'pxUpdateDateTime'];

  //       case 'pyID': return compare(a.pyID, b.pyID, isAsc);
  //       case 'pyLabel': return compare(a.pyLabel, b.pyLabel, isAsc);
  //       case 'pyStatusWork': return compare(a.pyStatusWork, b.pyStatusWork, isAsc);
  //       case 'pxUpdateDateTime': return compare(a.pxUpdateDateTime, b.pxUpdateDateTime, isAsc);
  //       // case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}

// function compare(a: number | string, b: number | string, isAsc: boolean) {
//   return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
// }
