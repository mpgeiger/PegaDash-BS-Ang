import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { DatapageService } from '../../../_services/datapage.service';
import { PagerService } from '../../../_services/pager.service';
// import stubbedResults from '@ss/json/D_Interaction_Driver_I-826_SJ.json';
import stubbedResults from '@ss/json/D_Interaction_Driver_I-901__PW.json';
import { ModalRCIContainerComponent, ModalRCIPegaComponent } from '../modal-container/modal-container.component';
import {MatTableDataSource, MatSort, MatMenu} from '@angular/material';

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
  providers: [
    ModalRCIContainerComponent
  , ModalRCIPegaComponent],
  selector: 'app-mega-menu',
  templateUrl: './mega-menu.component.html',
  styleUrls: ['./mega-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MegaMenuComponent implements OnInit {
  // public dataSource = new MatTableDataSource<TreasurerCases>();
  @ViewChild(MatSort) sort: MatSort;
  // @Output() mpgMenu = new MatMenu;
  componentName = 'mega-menu.component';
  pegaService = 'D_CustomerIntentTasks';

  message: any;
  subscription: Subscription;
  showLoading = true;

  sortedDataCategory: SSCaseActions[];
  sortedDataActions: SSCaseActions[];
  searchedList: any;

  headers: any;
  actions: SSCaseActions[] = [];
  constructor(
    private datapage: DatapageService,
    private pagerService: PagerService,
    private mc: ModalRCIContainerComponent,
    private rciMashup: ModalRCIPegaComponent
  ) { }

  ngOnInit() {
    if (this.checkIfStubbed()) {
      console.log(this.componentName + ' -- STUBBED ' + this.pegaService);
      this.getStubbedCases();
    } else {
      console.log(this.componentName + ' -- LIVE ' + this.pegaService);
      // this.getCases();
      this.getCases();
    }
    // console.log('count of ' + this.pegaService + '-->', localStorage.getItem(this.pegaService));

  }
  ngAfterViewInit(): void {

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
    // console.log( 'in ' + this.componentName + ' mega-menu-results-->' + JSON.stringify(data.DriverCategories));
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
    localStorage.setItem(this.pegaService, this.actions.length.toString());
    this.showLoading = false;
  }
  getCases() {
    let dParams = new HttpParams();
    console.log('begin ' + this.pegaService + '-->');
     dParams = dParams.append('ContactId', '7103716305');
     let keyToRemove = '';

    this.datapage.getDataPage(this.pegaService, dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.actions = Object.keys(this.getDriverCategories(response.body)).map(it => this.getDriverCategories(response.body)[it]);
        for (const [key, value] of Object.entries(this.actions)) {
          // if (value.CategoryName === 'Sales and Offers') {
          console.log(this.componentName + '  key --->' + JSON.stringify(key) + '_______ value-->' + JSON.stringify(value));
          console.log('    CategoryName=' + value.CategoryName + '___________ key:' + JSON.stringify(key));
          if (value.CategoryName === 'Sales and Offers') {
            keyToRemove = JSON.stringify(key);
            console.log('keyToRemove-->' + keyToRemove);

          }
          // }
        }
        console.log('Length before removal:' + this.actions.length   );
        this.actions.splice(1, 1);
        console.log('Length after removal:' + this.actions.length   );
        // this.actions = this.getDriverCategories(response.body).json();
        localStorage.setItem(this.pegaService, this.actions.length.toString());
        this.showLoading = false;
      },
      err => {
        alert('Error from ' + this.componentName + ':' + err.errors);
      }
    );

  }

   // This function will be called on every key press for input text box
   search(value) {
     this.searchedList = this.actions.filter(
       (val) => val['pyLabel'].includes(value));
     // Searched Data
     console.log(this.searchedList);
   }


  public openModalDialogForService(): void {
    // this.mc.openCreateRciCaseDialog();
    this.rciMashup.openRciMashupCaseDialog();
    console.log('RCI Clicked Create ');
  }
  clickedRCI() {
    console.log('RCI Clicked Create ');

  }
  nonFunctioningService() {
    console.log('OTHER Clicked Create ');

  }
}
