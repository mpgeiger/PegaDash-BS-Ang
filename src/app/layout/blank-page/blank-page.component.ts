import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/blank-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
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

    // ngOnInit() {}
    ngOnInit() {
      // UnifiedtasklistComponent.get;

      // this.subscription = this.rwlservice.getMessage().subscribe(message => {
      //   this.message = message;

        // if (this.message.unifiedtasklist === 'Work' || this.message.unifiedtasklist === 'unifiedtasklist') {
        // this.getunifiedtasklist();

        // } else {
        // this.getWorkBaskets(this.message.unifiedtasklist);
        // }
      }

    }

