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
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';


export interface Cases {
  caseTypeID: string;
  ID: string;
  name: string;
  stage: string;
  status: string;
  createdBy: string;
  createTime: string;
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
  componentName = 'caselist.component';

  message: any;
  subscription: Subscription;
  showLoading = true;

  // cases: Array<any> = [];
  // displayedColumns = ['pxRefObjectInsName', 'pyAssignmentStatus', 'pyLabel', 'pxUrgencyAssign'];
  // displayedColumns = ['ID', 'name', 'createTime', 'stage', 'status', 'createdBy'];
  displayedColumns = ['name', 'status', 'createTime', 'ID', 'urgency'];
  public dataSource = new MatTableDataSource<Cases>();
  sortedData: Cases[] = [];
  cases: Cases[] = [];
  headers: any;
  @Input() lpp: number;
  public pageSize = 10;

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

    console.log(' LPP -->' + this.lpp);
    if (this.lpp === null || typeof this.lpp === 'undefined') {
      // $scope.msg = "pls enter something";
   } else {
     this.pageSize = this.lpp;
    }
    // this.sortData();
    // this.dataSource = this.cases;
   // this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
   // this.dataSource.sort = this.sort;
   // this.dataSource.paginator = this.paginator;

   // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
   // this.sortedData = this.cases.slice();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getCases();
  }

  getCases() {
    this.cService.cases().subscribe(
      response => {

       // console.log(' get cases SERVICE-->' + JSON.stringify(response.body));
        const resSTR = JSON.stringify(this.getResults(response.body));
        const resJSON = JSON.parse(resSTR);
       // console.log(' get cases  SERVICE-->', resJSON._body);
        // this.unifiedtask$ = new MatTableDataSource<any>(this.getResults(response.body));
        this.headers = response.headers;
        // this.unifiedtaskObject$ = JSON.parse(this.getResults(response.body));
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        // this.cases = JSON.parse(response.body);

        this.filterByDate(10);

        localStorage.setItem('caselist', this.cases.length.toString());
        console.log(' IN CASELIST.COMPONENT  # CASES -->' + localStorage.getItem('caselist'));



        this.dataSource.data = this.cases as Cases[];
        this.showLoading = false;
        // this.unifiedtask$.paginator = this.paginator;
        // this.unifiedtask$.sort = this.sort;

        // this.p_TotalNumberItems = this.cases.length;
        // this.initPagingInfo();
        // this.p_CurrentList = this.cases.slice(0, this.p_ItemsPerPage);
        // initialize to page 1
        // this.setPage(0);

      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
  }

  private filterByDate(days: number): any {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() - 12;
    const currentDay = currentDate.getDay();
    const currentYear = currentDate.getFullYear() + 1;
    const twoMonthPrior = new Date(currentYear, currentMonth - 1 , currentDay);
    const today = new Date();


    this.cases = this.cases.filter((item: any) => {
      const sDate = new Date(item.createTime);
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
