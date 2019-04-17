// import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/opentask-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { SharedPegaDataService } from './../pega/_services/sharedpegadata.service';

@Component({
    selector: 'app-opentask-page',
    templateUrl: './opentask-page.component.html',
    styleUrls: ['./opentask-page.component.scss'],
    animations: [routerTransition()]
})
export class OpenTaskPageComponent implements OnInit {
    constructor(public _pegaDataService: SharedPegaDataService) {

    }
    D_RecentTreasurerCases$ = '';
    cases$ = '';
    // utCount = 44;

    // ngOnInit() {}
    ngOnInit() {
      // const ot = this._pegaDataService.getOption();
      const ot = localStorage.getItem('ls_UTOpen');
      console.log(' share OpenTasks -->' + ot);
      // this.utCount = this._pegaDataService.getOption();
      //this.utCount =  parseInt(localStorage.getItem('D_RecentTreasurerCases'));
      this.D_RecentTreasurerCases$ = localStorage.getItem('D_RecentTreasurerCases');
      console.log('   # CASES -->' + localStorage.getItem('cases'));
      this.cases$ = localStorage.getItem('caselist');


      console.log(' Local Storage test GET-->' + localStorage.getItem('numUnifiedTaskList'));
      }

    }

