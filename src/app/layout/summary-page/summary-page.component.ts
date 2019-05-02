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
    constructor() {}
    numUnifiedTaskList$ = '';
    D_RecentTreasurerCases$ = '';
    D_TransactionSummary$ = '';
    cases$ = '';
    nameSummaryPage = new FormControl('');
    // ngOnInit() {}
    ngOnInit() {

      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      this.D_RecentTreasurerCases$ = localStorage.getItem('D_RecentTreasurerCases');
      this.D_TransactionSummary$ = localStorage.getItem('D_TransactionSummary');
      // this.D_RecentTreasurerCases$ = '99';
      }

    }

