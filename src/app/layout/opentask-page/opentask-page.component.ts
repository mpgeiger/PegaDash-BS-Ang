import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { Subscription } from 'rxjs';
import { SharedPegaDataService } from './../pega/_services/sharedpegadata.service';
import { OpenNewCaseService } from '@ss/app/_messages/opennewcase.service';
import { GetAssignmentService } from '@ss/app/_messages/getassignment.service';
import { GetNewCaseService } from '@ss/app/_messages/getnewcase.service';

@Component({
    selector: 'app-opentask-page',
    templateUrl: './opentask-page.component.html',
    styleUrls: ['./opentask-page.component.scss'],
    animations: [routerTransition()]
})
export class OpenTaskPageComponent implements OnInit {
    constructor(
      public _pegaDataService: SharedPegaDataService,
      private oncService: OpenNewCaseService,
      private gaService: GetAssignmentService,
      private gncService: GetNewCaseService

      ) {

        this.openNewCaseSubscrption = this.oncService.getMessage().subscribe(
          message => {
            this.openNewCaseMessage = message;

            this.isNewCase = true;
            // this.addTab("New", null);
          }
        );

    }
    D_RecentTreasurerCases = '';
    cases$ = '';

    message: any;
    subscription: Subscription;

    isNewCase = false;
    openNewCaseMessage: any;
    openNewCaseSubscrption: Subscription;


    openAll = false;
    // utCount = 44;

    // ngOnInit() {}
    ngOnInit() {
      // const ot = this._pegaDataService.getOption();
      // const ot = localStorage.getItem('ls_UTOpen');
      // console.log(' share OpenTasks -->' + ot);
      // this.utCount = this._pegaDataService.getOption();
      // this.utCount =  parseInt(localStorage.getItem('D_RecentTreasurerCases'));
       this.D_RecentTreasurerCases = localStorage.getItem('D_RecentTreasurerCases');
       console.log('   # CASES -->' + localStorage.getItem('cases'));
       this.cases$ = localStorage.getItem('caselist');


      // console.log(' Local Storage test GET-->' + localStorage.getItem('numUnifiedTaskList'));
      }

      onClick() {
        // this.ga.getMessage();
        // this.gncService.sendMessage(this.openNewCaseMessage.caseID);
        this.gncService.sendMessage('S-2802');

      }

    }

