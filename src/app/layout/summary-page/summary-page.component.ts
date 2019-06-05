import { SharedPegaModule } from './../../shared-pega/shared-pega.module';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl } from '@angular/forms';
import { PegaVariablesPropertiesComponent } from './../../shared-pega/pega-variables-properties/pega-variables-properties.component';

@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
  animations: [routerTransition()]
})
export class SummaryPageComponent implements OnInit {
  componentName = 'summary-page.component';
  userName = '';
  displayUserName = '';
  lastAccess = '';


  totalCurrentLiabilities: number = Number(localStorage.getItem('totalCurrentLiabilities'));
  totalAvgMonthLiabilities = Number(localStorage.getItem('totalAvgMonthLiabilities'));
  totalCurrentAssets = Number(localStorage.getItem('totalCurrentAssets'));
  totalAvgMonthAssets = Number(localStorage.getItem('totalAvgMonthAssets'));


  // localStorage.setItem('totalCurrentLiabilities', totCurrLiab.toString());
  // localStorage.setItem('totalAvgMonthLiabilities', totAvgMonthLiab.toString());
  // localStorage.setItem('totalCurrentAssets', totCurrAsset.toString());
  // localStorage.setItem('totalAvgMonthAssets', totAvgMonthAsset.toString());

  constructor(
    private pega: PegaVariablesPropertiesComponent
  ) { }


  /*
*
*/
  pega_NBA_Header = '';
  customer_Abbreviation = '';


  numUnifiedTaskList$ = '';
  D_RecentTreasurerCases$ = '';
  D_TransactionSummary$ = '';
  cases$ = '';
  nameSummaryPage = new FormControl('');

  // ngOnInit() {}
  ngOnInit() {
    // this.customer_Abbreviation = this.pega.pega_Customer_Abbreviation;
    // this.userName = localStorage.getItem('userName');
    // this.userName = localStorage.getItem('userName');
    // this.displayUserName = localStorage.getItem('displayUserName');
    // this.lastAccess = localStorage.getItem('lastAccess');
    // this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
    // this.D_RecentTreasurerCases$ = localStorage.getItem('D_RecentTreasurerCases');
    // this.D_TransactionSummary$ = localStorage.getItem('D_TransactionSummary');
    // // this.D_RecentTreasurerCases$ = '99';
    // console.log(this.componentName + ' LS -- userName-->' + this.userName);
    // console.log(this.componentName + ' LS -- lastAccess-->' + this.lastAccess);
    // console.log(this.componentName + ' LS --> userName -->' + localStorage.getItem('userName'));
    // console.log(this.componentName + ' LS --> displayUserName -->' + localStorage.getItem('displayUserName'));
    // console.log(this.componentName + ' LS -- lastAccess-->' + localStorage.getItem('lastAccess'));
    // console.log(this.componentName + ' LS -- totalCurrentLiabilities-->' + localStorage.getItem('totalCurrentLiabilities'));
    // console.log(this.componentName + ' LS -- totalAvgMonthLiabilities-->' + localStorage.getItem('totalAvgMonthLiabilities'));
    // console.log(this.componentName + ' LS -- totalCurrentAssets-->' + localStorage.getItem('totalCurrentAssets'));
    // console.log(this.componentName + ' LS -- totalAvgMonthAssets-->' + localStorage.getItem('totalAvgMonthAssets'));
    // this.totalCurrentLiabilities = Number(localStorage.getItem('totalCurrentLiabilities'));
    // this.totalAvgMonthLiabilities = Number(localStorage.getItem('totalAvgMonthLiabilities'));
    // this.totalCurrentAssets = Number(localStorage.getItem('totalCurrentAssets'));
    // this.totalAvgMonthAssets = Number(localStorage.getItem('totalAvgMonthAssets'));

  }

  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
    this.userName = localStorage.getItem('userName');
    this.userName = localStorage.getItem('userName');
    this.displayUserName = localStorage.getItem('displayUserName');
    this.lastAccess = localStorage.getItem('lastAccess');
    this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
    this.D_RecentTreasurerCases$ = localStorage.getItem('D_RecentTreasurerCases');
    this.D_TransactionSummary$ = localStorage.getItem('D_TransactionSummary');
    // this.D_RecentTreasurerCases$ = '99';
    console.log(this.componentName + ' LS -- userName-->' + this.userName);
    console.log(this.componentName + ' LS -- lastAccess-->' + this.lastAccess);
    console.log(this.componentName + ' LS --> userName -->' + localStorage.getItem('userName'));
    console.log(this.componentName + ' LS --> displayUserName -->' + localStorage.getItem('displayUserName'));
    console.log(this.componentName + ' LS -- lastAccess-->' + localStorage.getItem('lastAccess'));
    console.log(this.componentName + ' LS -- totalCurrentLiabilities-->' + localStorage.getItem('totalCurrentLiabilities'));
    console.log(this.componentName + ' LS -- totalAvgMonthLiabilities-->' + localStorage.getItem('totalAvgMonthLiabilities'));
    console.log(this.componentName + ' LS -- totalCurrentAssets-->' + localStorage.getItem('totalCurrentAssets'));
    console.log(this.componentName + ' LS -- totalAvgMonthAssets-->' + localStorage.getItem('totalAvgMonthAssets'));
    this.totalCurrentLiabilities = Number(localStorage.getItem('totalCurrentLiabilities'));
    this.totalAvgMonthLiabilities = Number(localStorage.getItem('totalAvgMonthLiabilities'));
    this.totalCurrentAssets = Number(localStorage.getItem('totalCurrentAssets'));
    this.totalAvgMonthAssets = Number(localStorage.getItem('totalAvgMonthAssets'));
  }


}

