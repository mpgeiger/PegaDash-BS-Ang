// import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/opentask-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';

@Component({
    selector: 'app-opentask-page',
    templateUrl: './opentask-page.component.html',
    styleUrls: ['./opentask-page.component.scss'],
    animations: [routerTransition()]
})
export class OpenTaskPageComponent implements OnInit {
    constructor() {}
    numUnifiedTaskList$ = '';

    // ngOnInit() {}
    ngOnInit() {

      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      }

    }

