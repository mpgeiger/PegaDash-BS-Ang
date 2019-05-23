import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DatapageService } from '../../../_services/datapage.service';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import stubbedResults from '../../../../assets/json/D_InteractionHistory.json';

export interface RecentInteractions {
  pyID: string;
  pyDescription: string;
  pyStatusWorkTimestamp: string;
  pxCreateDateTime: string;
  pxUpdateDateTime: string;
  pxUrgencyWork: number;
  pxUrgencyWorkClass: number;
  pxUrgencyWorkSLA: number;
  pyLabel: string;
  pyStatusWork: string;
  pzInsKey: string;
}
@Component({
  selector: 'app-recent-interactions',
  templateUrl: './recent-interactions.component.html',
  styleUrls: ['./recent-interactions.component.scss']
})
export class RecentInteractionsComponent implements OnInit {
  componentName = 'recent-interactions.component';

  message: any;
  subscription: Subscription;
  showLoading = false;
  public dataSource = new MatTableDataSource<RecentInteractions>();
  sortedData: RecentInteractions[];
  headers: any;
  cases: RecentInteractions[] = [];
  displayedColumns = ['pyDescription', 'pyID', 'pxCreateDateTime', 'pxUrgencyWork'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    // public cService: CaseService,
    private datapage: DatapageService
  ) { }

  ngOnInit() {
    // this.showLoading = true;
    if (this.checkIfStubbed()) {

      console.log('STUBBED D_RecentTreasurerCases');
      this.getStubbedCases();
    } else {
      console.log('LIVE D_RecentTreasurerCases');
      this.getStubbedCases();
    }
  }
  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sortedData = this.cases.slice();

    // if (this.checkIfStubbed()) {

      //   console.log('STUBBED D_RecentTreasurerCases');
      //   this.getStubbedCases();
      // } else {
        //   console.log('LIVE D_RecentTreasurerCases');
        //   this.getStubbedCases();
        // }
        // this.dataSource.sort = this.sort;
        // this.dataSource.data = this.cases as RecentInteractions[];

        // console.log('LIVE D_RecentTreasurerCases ngAfterViewInit--> ' + JSON.stringify(this.dataSource.data));
        // this.dataSource.paginator = this.paginator;
    // this.sort.disableClear = true;
  }
  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    useStub = (useStubStr === 'true');
    useStub = true;
    return useStub;
  }
  getStubbedCases() {
    const stubbed: any = stubbedResults;
    this.showLoading = true;
    this.cases = Object.keys(this.getResults(stubbed)).map(it => this.getResults(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
   // this.sortedData = this.cases.slice();
    // this.dataSource.data = this.cases as RecentInteractions[];
    // this.dataSource.filterPredicate = this.createFilter();
    this.dataSource.data = this.cases as RecentInteractions[];

        console.log('LIVE D_RecentTreasurerCases ngAfterViewInit--> ' + JSON.stringify(this.dataSource.data));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    localStorage.setItem('D_InteractionHistory', this.cases.length.toString());
    console.log('count of D_InteractionHistory-->  ', localStorage.getItem('D_InteractionHistory'));
    this.showLoading = false;

  }

  getCases() {
    // cont; foo = useStubbedData;
   // const unifiedtaskParams = new HttpParams().set('UserId', 'SallyJones').set('WorkGroup', 'NewWaveWG');
   let dParams = new HttpParams();
   dParams = dParams.append('Type', 'CONTACT');
   dParams = dParams.append('ID', '7103716305');
   this.showLoading = true;

    this.datapage.getDataPage('D_InteractionHistory', dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.cases = Object.keys(this.getResults(response.body)).map(it => this.getResults(response.body)[it]);
        // this.dataSource.data = this.cases as RecentInteractions[];
        // this.dataSource.filterPredicate = this.createFilter();
        localStorage.setItem('D_InteractionHistory', this.cases.length.toString());

       // this.sortedData = this.cases.slice();
        // this.ngAfterViewInit();


        console.log('count of D_InteractionHistory-->  ', localStorage.getItem('D_InteractionHistory'));
        this.showLoading = false;
      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
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
  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }
}
