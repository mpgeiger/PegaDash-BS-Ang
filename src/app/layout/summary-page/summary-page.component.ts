// import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/summary-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-summary-page',
    templateUrl: './summary-page.component.html',
    styleUrls: ['./summary-page.component.scss'],
    animations: [routerTransition()]
})
export class SummaryPageComponent implements OnInit {
    constructor() {}
    numUnifiedTaskList$ = '';

    // ngOnInit() {}
    ngOnInit() {

      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      }

    }

