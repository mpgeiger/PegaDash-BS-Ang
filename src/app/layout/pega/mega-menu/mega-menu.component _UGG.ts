import { Component, OnInit, ViewChild, AfterViewInit, ViewEncapsulation, OnChanges, SimpleChanges} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import { DatapageService } from '../../../_services/datapage.service';
import { PagerService } from '../../../_services/pager.service';
// import stubbedResults from '@ss/json/D_Interaction_Driver_I-826_SJ.json';
//  import stubbedResults from '@ss/json/D_Interaction_Driver_I-901__PW.json';
import stubbedResults from '@ss/json/MegaMenu.json';
import { ModalRCIContainerComponent, ModalRCIPegaComponent  } from '../modal-container/modal-container.component';
import {MatTableDataSource, MatSort, MatMenu} from '@angular/material';

import { PegaVariablesPropertiesComponent } from '@ss/pega-shared/pega-variables-properties.component';

import { FilterPipe } from './../_pipes/searchFilterPipe';

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

export interface CategoryVis {
  categoryName: string;
  indexCategory: number;
  countItems: number;
  visibility: boolean;
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

  // @Output() cssRefresh = new EventEmitter<boolean>();
  // this.cssRefresh.emit(true);


  // @Output() mpgMenu = new MatMenu;
  componentName = 'mega-menu.component';
  pegaService = 'D_CustomerIntentTasks';

  step = 'step2';

  message: any;
  subscription: Subscription;
  showLoading = true;

  sortedDataCategory: SSCaseActions[];
  sortedDataActions: SSCaseActions[];
  searchedList: any;
  categoryVis: CategoryVis[];
  changeCount = 0;
  headers: any;
  actions: SSCaseActions[] = [];

  _0_0 = false;
  _1_0 = false;
  _2_0 = false;
  _3_0 = false;


  //  visCat = {
  //    {'i' : 0, 'j' : 10, 'vis' : true },
  //    {'i' : 1, 'j' : 10, 'vis' : true },
  //    {'i' : 2, 'j' : 10, 'vis' : true },
  //    {'i' : 3, 'j' : 10, 'vis' : true },
  //    {'i' : 4, 'j' : 10, 'vis' : true }
  //   };

  prevCat = 0;

  constructor(
    private datapage: DatapageService,
    private pagerService: PagerService,
    private mc: ModalRCIContainerComponent,
    private rciMashup: ModalRCIPegaComponent,
    private pega: PegaVariablesPropertiesComponent
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

//   ngOnChanges(changes: SimpleChanges) {
//     for (const propName in changes) {
//       const change = changes[propName];
//       const curVal  = JSON.stringify(change.currentValue);
//       const prevVal = JSON.stringify(change.previousValue);
//       console.log(this.componentName + '  CHANGES   Prev Val-->' + prevVal + '____Current-->' + curVal);
//     }
//     //   if (curVal !== prevVal) {
//     //     console.log(this.componentName + '\t\t NOT same!');
//     //   }
//     //      }

//         //  const sc_totalCurrentAssets: SimpleChange = changes.totalCurrentAssets;

//         //  console.log(' Simple Change ' + sc_totalCurrentAssets.currentValue + '-->' + this._totalCurrentAssets );
//         //  this._totalCurrentAssets = sc_totalCurrentAssets.currentValue;



//     // if (changes.currentValue) {
//     //     this.totalCurrentAssets = chang;
//     // }
// }

  // testForEmpty(cat): boolean {
  testForEmpty(cat): boolean {

    let result = false;
    let resultCount = 0;

    result = false;
     const _cat = cat;

     // let obj = cat.find(obj => obj.id == 3);


     resultCount = Object.keys(cat).length;
    // console.log(this.componentName + '   megamenu-->' + JSON.stringify(cat));
    // console.log(this.componentName + '   megamenu-->' + JSON.stringify(_cat.length));
    // console.log(this.componentName + '   megamenu-->' cat.CategoryName + ' = ' + resultCount);

    if (resultCount = 0) {
      result = true;
    }

    return result;


  }

  setPrevCat(cat) {
    const _prev = this.prevCat;
    this.prevCat = cat;
    const size = cat.pxResults.length;
    // console.log (' ### cat length-->' + size);

    if (size > 0) {
      return false;
    } else {
      return true;
    }
  }

//  set_0(val) {
//    let result=false;
//    if (val  0) {

//    }
//    this._0_0 = false;
//  }
//  set_1() {
//   this._1_0 = false;
// }
// set_2() {
//   this._2_0 = false;
// }
// set_3() {
//   this._3_0 = false;
// }
  setEmptyCat(i, j) {
    console.log( ' setEmptyCat i-' + i + '__ j-' + j );
    // if (j = 0) {
    //   return true;
    // } else {
    //   return false;
    // }
    return i;
  }

  checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    useStub = (useStubStr === 'true');
    useStub = true;
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
    let myVis: CategoryVis;
    const keyToRemove = '';

    const stubbed: any = stubbedResults;
    console.log(this.componentName + ' stubbed-->' + stubbed);
    this.actions = Object.keys(stubbed).map(it => stubbed[it]);


    // for (const [key, value] of Object.entries(this.actions)) {
    //   // if (value.CategoryName === 'Sales and Offers') {
    //     console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    //   const pxResults: any = value.pxResults;
    //   console.log(this.componentName + '  key --->' + JSON.stringify(key) + '_______ value-->' + JSON.stringify(value.CategoryName));
    //   // console.log('    CategoryName=' + value.CategoryName + '___________ key:' + JSON.stringify(key));
    //   // if (value.CategoryName === 'Sales and Offers') {
    //   //   keyToRemove = JSON.stringify(key);
    //   //   console.log('keyToRemove-->' + keyToRemove);
    //   // }
    //   console.log(' cat->' + value.CategoryName + '__index->' + JSON.stringify(key) + '___count->' + pxResults.length + '___visibility->' + true);
    //   // myVis.indexCategory = parseInt(JSON.stringify(key));

    //   // myVis.countItems = pxResults.length;
    //   // myVis.visibility = true;
    //   // myVis.indexCategory = parseInt(JSON.stringify(key));

    //   // myVis.countItems = pxResults.length;
    //   // myVis.visibility = true;

    //   // console.log('   visCategory My Vis -->' + JSON.stringify(myVis));
    //   // this.categoryVis.pop(myVis);
    //   // this.categoryVis.pop(myVis);
    // }
    console.log('   visCategory -->' + JSON.stringify(this.actions));
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
     const keyToRemove = '';

    this.datapage.getDataPage(this.pegaService, dParams).subscribe(
      response => {
        this.headers = response.headers;
        this.actions = Object.keys(this.getDriverCategories(response.body)).map(it => this.getDriverCategories(response.body)[it]);

        let i = 0;
        for (const [key, value] of Object.entries(this.actions)) {
          // if (value.CategoryName === 'Sales and Offers') {
          console.log(this.componentName + '  key --->' + JSON.stringify(key) + '_______ value-->' + JSON.stringify(value.CategoryName));
          // console.log('    CategoryName=' + value.CategoryName + '___________ key:' + JSON.stringify(key));
          // if (value.CategoryName === 'Sales and Offers') {
          //   keyToRemove = JSON.stringify(key);
          //   console.log('keyToRemove-->' + keyToRemove);

          // }
          i++;


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


  mapToProp(data, prop) {
    return data
      .reduce((res, item) => Object
        .assign(res, {
          [item[prop]]: 1 + (res[item[prop]] || 0)
        }), Object.create(null))
    ;
  }


  // catCount(cat, data) {

  // }
  hideCatTest(index): boolean {
     if (index >= 1) {
       return true;
     } else {
       return false;
     }

  }

   // This function will be called on every key press for input text box
   search(value) {
     this.searchedList = this.actions.filter(
       (val) => val['pyLabel'].includes(value));
      //  this.testForEmpty();
     // Searched Data
     console.log(this.searchedList);
   }

   showCategoryVis(category: number , count: number): boolean {

    let show = true;
    if (count < 0) {
      show = false;
    }

    return show;
   }


  public openModalDialogForService(ev, action): void {
    // this.mc.openCreateRciCaseDialog();
    console.log(this.componentName + 'RCI Clicked Create event-->' + action + '___caught-->' + JSON.stringify(ev) );
    if (action === 'Request Cheque Image') {
      this.rciMashup.openRciMashupCaseDialog();
    }
    if (action === 'Wire Recall') {
      this.rciMashup.openWireRecalMashupCaseDialog();
    }

  }
  // public doFilter = (value: string) => {
  //   this.actions = value.trim().toLocaleLowerCase();
  // }
//   filter(value) {

//     let action = value;
//     this.actionsFiltered = this.actions
//                                 .filter((book: Book) => book.storeId === storeId);
//     this.bookList = this.bookFilteredList;
// }

  clickedRCI() {
    console.log('RCI Clicked Create ');

  }
  nonFunctioningService(ev, action) {
    console.log(this.componentName + 'RCI Clicked Create event caught-->' + JSON.stringify(ev));


  }
}
