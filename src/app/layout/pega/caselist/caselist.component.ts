import { slideInAnimation } from './../../../animations';

import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
import { FormControl } from '@angular/forms';
// import * as moment from 'moment';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import stubbedResults from '@ss/json/D_MPG_OpenCaseList.json';
import { filter } from 'rxjs/operators';


export interface Cases {
  caseTypeID: string;
  ID: string;
  name: string;
  stage: string;
  status: string;
  createdBy: string;
  CreatedDate: Date;
  CompletionDate: Date;
  // lastUpdatedBy: string;
  pxObjClass: string;
  urgency: string;
  lastUpdateTime: string;
  lastUpdatedBy: string;
}

@Component({
  selector: 'app-caselist',
  templateUrl: './caselist.component.html',
  styleUrls: ['./caselist.component.scss']
})
export class CaselistComponent implements OnInit, AfterViewInit  {


  message: any;
  subscription: Subscription;
  showLoading = true;

  displayedColumns = ['name', 'status', 'CompletionDate', 'ID'];

  public dataSource = new MatTableDataSource<Cases>();
  sortedData: Cases[] = [];
  cases: Cases[] = [];
  headers: any;
  @Input() lpp: number;
  public pageSize = 5;

  nameFilter = new FormControl('');
  statusFilter = new FormControl('');
  completionDateFilter = new FormControl('');
  idFilter = new FormControl('');
  // columnsToDisplay = ['name', 'status', 'favouriteColour', 'pet'];
  filterValues = {
    fName: '',
    fStatus: '',
    CompletionDate: '',
    fID: ''
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
  componentName = 'caselist.component';
  ngOnInit() {
    this.getStubbedCases();
    // this.nameFilter.valueChanges.subscribe(name => {
    //       this.filterValues.name = name;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   );

      this.nameFilter.valueChanges.subscribe((nameFilterValue) => {
        this.filterValues['fName'] = nameFilterValue;
        this.dataSource.filter = JSON.stringify(this.filterValues);
      });

    // this.completionDateFilter.valueChanges
    //   .subscribe(
    //     CompletionDate => {
    //       this.filterValues.CompletionDate = CompletionDate;
    //       this.dataSource.filter = JSON.stringify(this.filterValues);
    //     }
    //   );
    this.statusFilter.valueChanges.subscribe((statusFilterValue) => {
      this.filterValues['fStatus'] = statusFilterValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
    this.idFilter.valueChanges.subscribe((idFilterValue) => {
      this.filterValues['fID'] = idFilterValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    console.log(' LPP -->' + this.lpp);
    if (this.lpp === null || typeof this.lpp === 'undefined') {
      // $scope.msg = "pls enter something";
   } else {
     this.pageSize = this.lpp;
    }
    this.dataSource.data = this.cases;
    this.dataSource.filterPredicate = this.createFilter();
    //  this.sortData();
    // this.dataSource = this.cases;
   // this.ngAfterViewInit();
  }
  createFilter(): (data: any, filter: string) => boolean {

    const filterFunction = function(data, filter): boolean {
      console.log(' filterString -->' + filter);
      const searchTerms = JSON.parse(filter);
      // console.log(' name -->' + filter.['fName']);
      // filter.fName = toLowerCase(filter.fName);
      searchTerms.fName = searchTerms.fName.toLowerCase();
      searchTerms.fID = searchTerms.fID.toLowerCase();
      console.log('PARSED filterString -->' + JSON.stringify(searchTerms));
      // console.log(this.componentName + ' filterData -->' + JSON.stringify(data));
      return data.name.toLowerCase().indexOf(searchTerms.fName) !== -1
        // // && data.CompletionDate.toString().toLowerCase().indexOf(searchTerms.CompletionDate) !== -1
        && data.status.toLowerCase().indexOf(searchTerms.fStatus) !== -1
        && data.ID.toLowerCase().indexOf(searchTerms.fID) !== -1
        ;
    };
    return filterFunction;
  }


  ngAfterViewInit(): void {
   // this.dataSource.sort = this.sort;
   // this.dataSource.paginator = this.paginator;

   // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
   // this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.getStubbedCases();
  }

  getCases() {
    this.cService.cases().subscribe(
      response => {
        const resSTR = JSON.stringify(this.getResults(response.body));
        const resJSON = JSON.parse(resSTR);

        this.headers = response.headers;
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        // this.cases = JSON.parse(response.body);
        this.filterByDate(10);
        localStorage.setItem('caselist', this.cases.length.toString());
        console.log(' IN CASELIST.COMPONENT  # CASES -->' + localStorage.getItem('caselist'));
        this.dataSource.data = this.cases as Cases[];
        this.showLoading = false;

      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
  }

  getStubbedCases() {
        const stubbed: any = stubbedResults;

        this.cases = Object.keys(this.getResults(stubbedResults)).map(it => this.getResults(stubbedResults)[it]);
        // this.cases = JSON.parse(response.body);
        this.filterByDate(10);
        localStorage.setItem('caselist', this.cases.length.toString());
        console.log(' IN CASELIST.COMPONENT  # CASES -->' + localStorage.getItem('caselist'));
        this.dataSource.data = this.cases as Cases[];
        this.showLoading = false;
  }
  private filterByDate(days: number): any {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() - 12;
    const currentDay = currentDate.getDay();
    const currentYear = currentDate.getFullYear() + 1;
    const twoMonthPrior = new Date(currentYear, currentMonth - 1 , currentDay);
    const today = new Date();


    this.cases = this.cases.filter((item: any) => {
      const sDate = new Date(item.CreatedDate);
      let test = false;


      if (sDate.valueOf() >= twoMonthPrior.valueOf()) {
        test = true;
      }
      // console.log(' pega -->' + sDate.toDateString() + ' -- ' + test + ' -- ' + twoMonthPrior.toDateString());

      // return sDate.valueOf() >= twoMonthPrior.valueOf() &&  sDate.getDate() <= today.getDate();
      return sDate.valueOf() >= twoMonthPrior.valueOf();
  });


  }

  private getColor(slaValue) {
    let pillStyle = 'badge badge-pill badge-';

    let style = 'danger';
    // console.log ( 'testing urgency-' + slaValue + '__color-->' + style);

    if ( !slaValue ) {
      style = 'gray-300';
      // console.log ('  testing color-' + slaValue + '__color-->' + color);
      pillStyle = pillStyle + style;
      return pillStyle;
    }
    if (slaValue >= 80 ) {
      // color = 'primary';
      style = 'red';
      pillStyle = pillStyle + style;
      return pillStyle;
    } else if (slaValue >= 70 )  {
      style = 'orange';
      pillStyle = pillStyle + style;
      return pillStyle;
    } else if (slaValue >= 50 )  {
      style = 'yellow';
      pillStyle = pillStyle + style;
      return pillStyle;
    } else if (slaValue >= 20) {
      style = 'teal';
      pillStyle = pillStyle + style;
      return pillStyle;
    } else {
      style = 'green';
      pillStyle = pillStyle + style;
      return pillStyle;
    }
  }

public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  sortData(sort: Sort) {
    const data = this.cases.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'ID': return compare(a.ID, b.ID, isAsc);
        case 'name': return compare(a.name, b.name, isAsc);
        // case 'fat': return compare(a.fat, b.fat, isAsc);
        // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        // case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.cases;
  }
  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
