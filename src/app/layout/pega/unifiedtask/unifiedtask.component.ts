
import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DatapageService } from '../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { OpenAssignmentService } from '../../../_messages/openassignment.service';
import { RefreshWorkListService } from '../../../_messages/refreshworklist.service';
import { PagerService } from '../../../_services/pager.service';
import { SharedPegaDataService } from '../_services/sharedpegadata.service';
import { stringify } from 'querystring';
import {Sort} from '@angular/material';

// import { NgbdPaginationCustomization } from '../ngPaging/pagination-customization';
// import { PaginationComponent } from '../../bs-component/components';
// import { CreateRCIcaseComponent } from './../../pega/create-rcicase/create-rcicase.component';
// import { groupBy } from 'rxjs/operators';
export interface UTL {
  pxUrgencyAssign: number;
  pyLabel: string;
  pyAssignmentStatus: string;
  pxRefObjectInsName: string;

}
@Component({
  selector: 'app-unifiedtask',
  templateUrl: './unifiedtask.component.html',
  styleUrls: ['./unifiedtask.component.scss'],
  providers: []
})

// export type SortDirection = 'asc' | 'desc' | '';
// const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
// export const compare = (v1, v2) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;


export class UnifiedtaskComponent implements OnInit {
  componentName = 'unifiedtask.component';

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  defaultPagination: number;
  // unifiedtask$: MatTableDataSource<any>;
  unifiedtaskObject$: Array<any> = [];
  tasks: Array<any> = [];

  // currentCase$: Object = {'pxApplication': 'Treasurer', 'pxAssignedOperatorID': 'SallyJones',
  //  'pxAssignedUserName': 'Sally Jones', 'pxCreateDateTime': '2019-03-11T10:51:25.734Z', 'pxDeadlineTime': '2019-03-11T11:01:25.734Z', 'pxGoalTime': '2019-03-11T10:56:25.733Z', 'pxObjClass': 'Assign-Worklist', 'pxRefObjectClass': 'PegaCPMFS-Work-RequestCheckImage', 'pxRefObjectInsName': 'S-1000487', 'pxRefObjectKey': 'PEGACPMFS-WORK S-1000487', 'pxTaskLabel': 'Enter Check Info', 'pxUrgencyAssign': '100', 'pyAssignmentStatus': 'Open', 'pyLabel': 'Request Check Image', 'pzInsKey': 'ASSIGN-WORKLIST PEGACPMFS-WORK S-1000487!COLLECT_FLOW', 'TaskType': 'Service'};


  ut: any;
  works$: Object;
  headers: any;

  message: any;
  subscription: Subscription;

  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  displayedColumns = ['pxRefObjectInsName', 'pyAssignmentStatus', 'pyLabel', 'pxUrgencyAssign'];

  //   variables for PAGING
  p_TotalNumberItems: number;
  p_ItemsPerPage = 5;
  p_NumPages: number;
  p_CurrentPage: 1;
  p_CurrentList: Object;
  sortedData: UTL[];

  constructor(
    private datapage: DatapageService,
    private oaservice: OpenAssignmentService,
    private rwlservice: RefreshWorkListService,
    // private createCase: CreateRCIcaseComponent,
    private pagerService: PagerService,
    public _pegaDataService: SharedPegaDataService

  ) {
    // _pegaDataService.setOption('UTL', '20');
    this.defaultPagination = 1;
    // this.sortedData = this.tasks.slice();
  }

  ngOnInit() {

    this._pegaDataService.setOption('openTasks', '66');

    // this.oaservice.sendMessage(this.currentCase$.pxRefObjectInsName, this.currentCase$);
    // this.oaservice.sendMessage('S-1000487', this.currentCase$);
    this.getunifiedtask();
    // this.ut.totalOpenTasks = this.tasks.length;

    this.subscription = this.rwlservice.getMessage().subscribe(message => {
      this.message = message;

      // if (this.message.unifiedtask === 'Work' || this.message.unifiedtask === 'unifiedtask') {
      // this.getunifiedtask();

      // } else {
      // this.getWorkBaskets(this.message.unifiedtask);
      // }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getunifiedtask() {
    const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');

    this.datapage.getDataPage('D_UnifiedWorkList', unifiedtaskParams).subscribe(
      response => {
       // console.log(' getunifiedtask SERVICE-->', this.getResults(response.body));
        const resSTR = JSON.stringify(this.getResults(response.body));
        const resJSON = JSON.parse(resSTR);
      //  console.log(' getunifiedtask SERVICE-->', resJSON._body);
        // this.unifiedtask$ = new MatTableDataSource<any>(this.getResults(response.body));
        this.headers = response.headers;
        // this.unifiedtaskObject$ = JSON.parse(this.getResults(response.body));
        this.tasks = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);

     //   console.log('XXX unifiedtaskObject-->  ', this.tasks);

        // this.unifiedtask$.paginator = this.paginator;
        // this.unifiedtask$.sort = this.sort;

        this.allItems = this.tasks;
        // this.p_TotalNumberItems = this.tasks.length;
        this.initPagingInfo();
        this.p_CurrentList = this.tasks.slice(0, this.p_ItemsPerPage);
        // initialize to page 1
        // this.setPage(0);

      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );
  }
  sortData(sort: Sort) {
    const data = this.tasks.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'pxUrgencyAssign': return compare(a.pxUrgencyAssign, b.pxUrgencyAssign, isAsc);
        case 'pyLabel': return compare(a.pyLabel, b.pyLabel, isAsc);
        // case 'fat': return compare(a.fat, b.fat, isAsc);
        // case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        // case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      }
    });
  }

  initPagingInfo() {
    // initialize to page 1
    this.p_CurrentPage = 1;
    this.p_TotalNumberItems = this.tasks.length;
    this._pegaDataService.setOption('openTasks', '33');
    this.p_NumPages = this.p_TotalNumberItems / this.p_ItemsPerPage;
    localStorage.setItem('ls_UTOpen', stringify(this.p_TotalNumberItems) );
  }

  loadNext = () => {
    const pointer = ( this.p_CurrentPage - 1 ) * this.p_ItemsPerPage;
    const endPointer = pointer + this.p_ItemsPerPage;
    this.p_CurrentList = this.tasks.slice( pointer , endPointer );
  }

  // setPage(page: number) {
  //   // get pager object from service
  //   this.pager = this.pagerService.getPager(this.allItems.length, page);

  //   // get current page of items
  //   this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  // }

  calcColor(val) {
    const maxval = 120;
    const minval = 3;
    // var val = 100;
    const moreisgood = false;

    const intnsty = (val - minval) / (maxval - minval);
    let r, g;
    if (moreisgood) {
      if (intnsty > 0.5) {
        g = 255;
        r = Math.round(2 * (1 - intnsty) * 255);
      } else {
        r = 255;
        g = Math.round(2 * intnsty * 255);
      }
    } else {
      // lessisgood
      if (intnsty > 0.5) {
        r = 255;
        g = Math.round(2 * (1 - intnsty) * 255);
      } else {
        g = 255;
        r = Math.round(2 * intnsty * 255);
      }
    }
    const rgb = 'rgb(' + r.toString() + ', ' + g.toString() + ', 0)';
    return '' + rgb + '';
  }

  getMyStyles() {
    const myStyles = {
      color: 'red'
    };
    return myStyles;
  }

  getResults(data) {
    localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }

  openAssignment(row) {
    console.log(' clicked row -->' + JSON.stringify(row) );
    this.oaservice.sendMessage(row.pxRefObjectInsName, row);
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
