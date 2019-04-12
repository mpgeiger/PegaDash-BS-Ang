
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
import {MatSort, MatTableDataSource} from '@angular/material';


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
  message: any;
  subscription: Subscription;

  // cases: Array<any> = [];
  // displayedColumns = ['pxRefObjectInsName', 'pyAssignmentStatus', 'pyLabel', 'pxUrgencyAssign'];
  // displayedColumns = ['ID', 'name', 'createTime', 'stage', 'status', 'createdBy'];
  displayedColumns = ['name', 'createTime', 'ID'];
  public dataSource = new MatTableDataSource<Cases>();
  sortedData: Cases[];
  headers: any;

  cases: Cases[] = [
    { 'caseTypeID': 'PegaCPMFS-Work-RequestCheckImage', 'createdBy': 'Sally Jones', 'createTime': '2019-04-03T10:25:23.049Z', 'ID': 'PEGACPMFS-WORK S-1401', 'lastUpdatedBy': 'Sally Jones', 'lastUpdateTime': '2019-04-03T10:25:53.831Z', 'name': 'Request Check Image', 'pxObjClass': 'Pega-API-CaseManagement-Case', 'stage': 'Resolution', 'status': 'Resolved-Completed', 'urgency': '10' }
  , { 'caseTypeID': 'PegaCPMFS-Work-BalanceInquiry', 'createdBy': 'Sally Jones', 'createTime': '2019-04-03T10:26:04.571Z', 'ID': 'PEGACPMFS-WORK B-12', 'lastUpdatedBy': 'Sally Jones', 'lastUpdateTime': '2019-04-03T10:26:48.622Z', 'name': 'Balance Inquiry', 'pxObjClass': 'Pega-API-CaseManagement-Case', 'stage': 'Cash Balance', 'status': 'New', 'urgency': '10' }
  , { 'caseTypeID': 'PegaCPMFS-Work-TransactionDetails', 'createdBy': 'Sally Jones', 'createTime': '2019-04-03T10:29:28.147Z', 'ID': 'PEGACPMFS-WORK T-38', 'lastUpdatedBy': 'Agent(Data-Corr-.Send)', 'lastUpdateTime': '2019-04-03T10:29:55.565Z', 'name': 'Transaction Details', 'pxObjClass': 'Pega-API-CaseManagement-Case', 'stage': 'Send Notification', 'status': 'Resolved-Completed', 'urgency': '10' }
  // , { 'caseTypeID': 'PegaCPMFS-Work-RequestCheckImage', 'createdBy': 'Sally Jones', 'createTime': '2019-04-10T15:29:46.474Z', 'ID': 'PEGACPMFS-WORK S-1436', 'lastUpdatedBy': 'Sally Jones', 'lastUpdateTime': '2019-04-10T15:29:46.830Z', 'name': 'Request Check Image', 'pxObjClass': 'Pega-API-CaseManagement-Case', 'status': 'New' }
  // , { 'caseTypeID': 'PegaCPMFS-Work-BalanceInquiry', 'createdBy': 'Sally Jones', 'createTime': '2019-04-10T15:30:36.712Z', 'ID': 'PEGACPMFS-WORK B-13', 'lastUpdatedBy': 'Sally Jones', 'lastUpdateTime': '2019-04-10T15:31:01.456Z', 'name': 'Balance Inquiry', 'pxObjClass': 'Pega-API-CaseManagement-Case', 'stage': 'Cash Balance', 'status': 'New', 'urgency': '10' }
];

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
    this.sortedData = this.cases.slice();
  }

  ngOnInit() {
    this.getCases();
    // this.sortData();
    // this.dataSource = this.cases;
    this.ngAfterViewInit();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getCases() {
    this.cService.cases().subscribe(
      response => {

        console.log(' get cases SERVICE-->' + JSON.stringify(response.body));
        const resSTR = JSON.stringify(this.getResults(response.body));
        const resJSON = JSON.parse(resSTR);
        console.log(' get cases  SERVICE-->', resJSON._body);
        // this.unifiedtask$ = new MatTableDataSource<any>(this.getResults(response.body));
        this.headers = response.headers;
        // this.unifiedtaskObject$ = JSON.parse(this.getResults(response.body));
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        // this.cases = JSON.parse(response.body);

        this.dataSource.data = this.cases as Cases[];

        // this.ngAfterViewInit();


        console.log('XXX unifiedtaskObject-->  ', this.cases);

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
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
