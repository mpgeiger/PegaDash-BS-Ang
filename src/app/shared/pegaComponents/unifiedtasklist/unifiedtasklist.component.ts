// import { NgPipesModule, GroupByPipe } from 'ngx-pipes';
import { Component, OnInit, ViewChild } from '@angular/core';
// import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DatapageService } from '../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { OpenAssignmentService } from '../../../_messages/openassignment.service';
import { RefreshWorkListService } from '../../../_messages/refreshworklist.service';
import { PagerService } from '../../../_services/pager.service';
// import { groupBy } from 'rxjs/operators';

@Component({
  selector: 'app-unifiedtasklist',
  templateUrl: './unifiedtasklist.component.html',
  styleUrls: ['./unifiedtasklist.component.scss'],
  providers: []
})
export class UnifiedtasklistComponent implements OnInit {
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // unifiedtasklist$: MatTableDataSource<any>;
  unifiedtasklistObject$: Array<any> = [];
  tasks: Array<any> = [];

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

  constructor(
    private datapage: DatapageService,
    private oaservice: OpenAssignmentService,
    private rwlservice: RefreshWorkListService,
    private pagerService: PagerService
  ) {}

  ngOnInit() {
    this.getunifiedtasklist();

    this.subscription = this.rwlservice.getMessage().subscribe(message => {
      this.message = message;

      // if (this.message.unifiedtasklist === 'Work' || this.message.unifiedtasklist === 'unifiedtasklist') {
      // this.getunifiedtasklist();

      // } else {
      // this.getWorkBaskets(this.message.unifiedtasklist);
      // }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getunifiedtasklist() {
    const unifiedtasklistParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');

    this.datapage.getDataPage('D_UnifiedWorkList', unifiedtasklistParams).subscribe(
      response => {
        console.log(' getunifiedtasklist SERVICE-->', this.getResults(response.body));
        const resSTR = JSON.stringify(this.getResults(response.body));
        const resJSON = JSON.parse(resSTR);
        console.log(' getunifiedtasklist SERVICE-->', resJSON._body);
        // this.unifiedtasklist$ = new MatTableDataSource<any>(this.getResults(response.body));
        this.headers = response.headers;
        // this.unifiedtasklistObject$ = JSON.parse(this.getResults(response.body));
        this.tasks = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);

        console.log('XXX unifiedtasklistObject-->  ', this.tasks);

        // this.unifiedtasklist$.paginator = this.paginator;
        // this.unifiedtasklist$.sort = this.sort;

        this.allItems = this.tasks;

        // initialize to page 1
        this.setPage(0);
      },
      err => {
        alert('Error form unifiedtasklist:' + err.errors);
      }
    );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

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
    this.oaservice.sendMessage(row.pxRefObjectInsName, row);
  }
}
