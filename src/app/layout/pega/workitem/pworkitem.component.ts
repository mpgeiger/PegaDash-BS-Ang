import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../../router.animations';

@Component({
    selector: 'app-pworkitem',
    templateUrl: './pworkitem.component.html',
    styleUrls: ['./pworkitem.component.scss'],
    animations: [routerTransition()]
})
export class PWorkItemComponent implements OnInit {
    constructor() {}
    numUnifiedTaskList$ = '';

    // ngOnInit() {}
    ngOnInit() {

      // this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      }

    }

