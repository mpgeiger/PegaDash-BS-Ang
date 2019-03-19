// import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/blank-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    animations: [routerTransition()]
})
export class BlankPageComponent implements OnInit {
    constructor() {}
    numUnifiedTaskList$ = '';

    // ngOnInit() {}
    ngOnInit() {

      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      }

    }

