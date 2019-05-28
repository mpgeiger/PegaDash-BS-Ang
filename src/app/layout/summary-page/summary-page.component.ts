import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-summary-page',
    templateUrl: './summary-page.component.html',
    styleUrls: ['./summary-page.component.scss'],
    animations: [routerTransition()]
})
export class SummaryPageComponent implements OnInit {
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

    constructor() {}
    numUnifiedTaskList$ = '';
    D_RecentTreasurerCases$ = '';
    D_TransactionSummary$ = '';
    cases$ = '';
    nameSummaryPage = new FormControl('');

    // ngOnInit() {}
    ngOnInit() {
      this.userName = localStorage.getItem('userName');
      this.userName = localStorage.getItem('userName');
      this.displayUserName = localStorage.getItem('displayUserName');
      this.lastAccess = localStorage.getItem('lastAccess');
      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      this.D_RecentTreasurerCases$ = localStorage.getItem('D_RecentTreasurerCases');
      this.D_TransactionSummary$ = localStorage.getItem('D_TransactionSummary');
      // this.D_RecentTreasurerCases$ = '99';
      console.log(' LS -- userName-->' + this.userName);
      console.log(' LS -- lastAccess-->' + this.lastAccess);
      console.log(' LS --> userName -->' + localStorage.getItem('userName'));
              console.log(' LS --> displayUserName -->' + localStorage.getItem('displayUserName'));
              console.log(' LS -- lastAccess-->' + localStorage.getItem('lastAccess'));
      }

    }

