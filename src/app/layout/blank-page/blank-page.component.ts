
// import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/blank-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CaseService } from '../../_services/case.service';
import { PegaErrors } from '../../_constants/PegaErrors';

import { CreateRCIcaseComponent } from '../pega/create-rcicase/create-rcicase.component';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    animations: [routerTransition()]
})
export class BlankPageComponent implements OnInit {

  currentCaseID$ = 'PegaCPMFS-Work-RequestCheckImage';

  isLoaded = false;
  isProgress = true;
  isView = false;
  isPage = false;
  isNewPage = false;

  state: Object = new Object();
  rciObj = 	{content : {
		Amount : '321.12',
		CheckRecepient : 'ACME Fin',
		CheckSender : 'Sally Jones',
		DaytimePhoneNumber : '555-867-5309',
		Month : 'August'
  }};

  myObjStr = JSON.stringify(this.rciObj);

    constructor(
      // private createCase: CreateRCIcaseComponent,
      private cservice: CaseService,
    ) {}
    numUnifiedTaskList$ = '';
    // const currentCast$ = {pxAssignedOperatorID

    // ngOnInit() {}
    ngOnInit() {

      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      }

  createNew() {
    // if (this.tpComp.formValid()) {

      // this.isProgress = true;
console.log(' IN CREATE NEW');
      this.state = this.rciObj.content;

      console.log('currentCaseID-->' + this.currentCaseID$ );
      console.log('state-->' + JSON.stringify(this.state ));
      // console.log('currentCaseID-->' +this.currentCaseID$ );


      this.cservice.createCase(this.currentCaseID$, this.state).subscribe(
        response => {


          const caseID = response.body['ID'];
          const caseName = caseID.split(' ')[1];

          const oAssignment = new Object();
          oAssignment['pxRefObjectInsName'] = caseName;
          oAssignment['pzInsKey'] = response.body['nextAssignmentID'];

          // renaming tab
          // MPG this.rtservice.sendMessage("New", caseName);

          // so renaming the tab, causes the tab to reload
          // so we need to send it a message to open the assigment, because
          // it lost it with the reload
          // MPG this.oaservice.sendMessage(caseName, oAssignment);

          // new item created, update worklist
         // MPG  this.rwlservice.sendMessage('Work');



        },
        err => {
          this.isProgress = false;
          this.handleErrors(err);
        }
      );

    }



  // handle the "err" object
  handleErrors(errorResponse: any) {

    if (errorResponse.error) {
      let error: any;
      let sErrors = '';
      for (error of errorResponse.error.errors) {
        if (error.ID === PegaErrors.VALIDATION_ERROR) {
          // this.handleValidationErrors(error.ValidationMessages);
        } else {
          sErrors += error.ID + ' - ' + error.message + '\n';
        }

      }

      if (sErrors !== '') {
        // let snackBarRef = this.snackBar.open(sErrors, "Ok");
        console.log(sErrors +  '--Ok');
      }
    } else {
      // MPG const generalSnackBarRef = this.snackBar.open(errorResponse.message, 'Ok');
      console.log(errorResponse.message +  '--Ok');
    }



    }

  }
