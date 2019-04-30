import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

import { DatapageService } from '../../../_services/datapage.service';
import { PagerService } from '../../../_services/pager.service';
// import stubbedResults from '../../../../assets/json/D_Interaction_Driver_I-826_SJ.json';
import stubbedResults from '../../../../assets/json/D_Interaction_Driver_I-901__PW.json';

export interface SSCaseTypePxResults {
Name: string;
PCAVersion: string;
pxInsId: string;
pxInsName: string;
pxObjClass: string;
pyClassName: string;
pyDescription: string;
pyLabel: string;
pyLabelOld: string;
pyRuleName: string;
pzInsKey: string;
ShowInList: string;
TaskClass: string;
}

export interface SSCaseActions {
  Behavior: string;
  CategoryName: string;
  CategoryPage: string;
  ControlWhen: string;
  DataSource: string;
  DriverCategories: string;
  pxObjClass: string;
  RequiredTaskName: string;
  pxResults: SSCaseTypePxResults;
}
@Component({
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent implements OnInit {
  // public dataSource = new MatTableDataSource<TreasurerCases>();

  message: any;
  subscription: Subscription;
  showLoading = true;

  sortedDataCategory: SSCaseActions[];
  sortedDataActions: SSCaseActions[];

  headers: any;
  actions: SSCaseActions[] = [];
  constructor(
    private datapage: DatapageService,
    private pagerService: PagerService

  ) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    // this.sortedData = this.cases.slice();
    // this.dataSource.sort = this.sort;
    // this.dataSource.paginator = this.paginator;
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



  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }
  getDriverCategories(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.DriverCategories;
  }
  getActionsInDriverCategory(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults.pyLabel;
  }

  getStubbedCases() {
    const stubbed: any = stubbedResults;
    this.actions = Object.keys(this.getDriverCategories(stubbed)).map(it => this.getDriverCategories(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
   // this.sortedData = this.cases.slice();
    // this.dataSource.data = this.cases as TreasurerCases[];
    // this.dataSource.filterPredicate = this.createFilter();
    localStorage.setItem('D_getDriverCategories', this.actions.length.toString());
    console.log('count of D_getDriverCategories-->  ', localStorage.getItem('D_getDriverCategories'));
    this.showLoading = false;
  }
  clickedRCI() {
    console.log('RCI Clicked Create ');

  }
  clickedOther() {
    console.log('OTHER Clicked Create ');

  }
}
