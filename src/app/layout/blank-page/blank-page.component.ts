
// import { UnifiedtasklistComponent } from './../../../../.history/src/app/layout/blank-page/components/unifiedtasklist/unifiedtasklist.component_20190318090940';
import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { CaseService } from '../../_services/case.service';
import { PegaErrors } from '../../_constants/PegaErrors';

import { CreateRCIcaseComponent } from '../pega/create-rcicase/create-rcicase.component';
// import { PWorkItemComponent } from '@ss/app/layout/pega/pworkitem/pworkitem.component';
import { ReferenceHelper } from '@ss/app/_helpers/reference-helper';
import { OpenAssignmentService } from '@ss/app/_messages/openassignment.service';
import { GetNewCaseService } from '@ss/app/_messages/getnewcase.service';
import { OpenNewCaseService } from '@ss/app/_messages/opennewcase.service';
import { RefreshWorkListService } from '@ss/app/_messages/refreshworklist.service';
import { GetAssignmentService } from '@ss/app/_messages/getassignment.service';

@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    animations: [routerTransition()]
})
export class BlankPageComponent implements OnInit {

  componentName = 'blank-page.component';

  currentCaseID$ = 'PegaCPMFS-Work-UT1';

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

  UT1 = {
    CanCreate: 'true',
    ID: 'PegaCPMFS-Work-UT1',
    name: 'UT1',
    pxObjClass: 'Pega-API-CaseManagement-CaseType',
    startingProcesses: [{
        ID: 'pyStartCase',
        name: 'UT1',
        pxObjClass: 'Pega-API-CaseManagement-Process',
        requiresFieldsToCreate: 'false'
      }
    ]
  };

  WB1 = {
    pxAssignedOperatorID: 'GeneralServiceWB',
    pxCreateDateTime: '2019-04-10T18:02:19.944Z',
    pxObjClass: 'Assign-WorkBasket',
    pxRefObjectInsName: 'AD-24',
    pxRefObjectKey: 'PEGACPMFS-WORK AD-24',
    pxUrgencyAssign: '10',
    pyAssignmentStatus: 'New',
    pyInstructions: 'Update new user details',
    pyLabel: 'Add Authorized User',
    pzInsKey: 'ASSIGN-WORKBASKET PEGACPMFS-WORK AD-24!ADDNEWUSER_FLOW'
};

  myObjStr = JSON.stringify(this.rciObj);

    constructor(
      // private createCase: CreateRCIcaseComponent,
      private cservice: CaseService,
      private oaservice: OpenAssignmentService,
      private gnservice: GetNewCaseService,
      private gaservice: GetAssignmentService,
      private oncservice: OpenNewCaseService,
      private rwlservice: RefreshWorkListService

    ) {}
    numUnifiedTaskList$ = '';
    // const currentCast$ = {pxAssignedOperatorID

    // ngOnInit() {}
    ngOnInit() {

      this.numUnifiedTaskList$ = localStorage.getItem('numUnifiedTaskList');
      }

      // getCase() {
      //   this.oaservice.sendMessage(caseName, oAssignment);
      // }


      // createCaseType(caseType: any) {
      createCaseType() {
        const caseType = this.UT1;
        if (caseType.startingProcesses[0].requiresFieldsToCreate === 'false') {
          // skip new
          this.cservice.createCase(caseType.ID, {}).subscribe(
            response => {
              // create a "row" that matches the worklist row, this way we can re-use
              // the open assignment service
              const row: any = {};
              const myCase: any = response.body;

              console.log(this.componentName + ' createCaseType() + myCase ' + myCase);


              row['pxRefObjectKey'] = myCase.ID;
              row['pxRefObjectInsName'] = myCase.ID.split(' ')[1];
              row['pzInsKey'] = myCase.nextAssignmentID;

              console.log(this.componentName + ' createCaseType() + row ' + JSON.stringify(row));
              console.log(this.componentName + ' createCaseType() + row.pxRefObjectInsName ' + row.pxRefObjectInsName);
              this.oaservice.sendMessage(row.pxRefObjectInsName, row);
// this.gaservice.sendMessage(c)

              // this.rwlservice.sendMessage('Work');




            },
            err => {
              alert('Errors from create case:' + err.errors);
            }

          );
        } else {
          // new
          this.oncservice.sendMessage(caseType.ID);

        }



      }


  createNew() {
    // if (this.tpComp.formValid()) {

      // this.isProgress = true;
console.log(' IN CREATE NEW');
      // this.state = this.rciObj.content;
      this.state = {};

      console.log('currentCaseID-->' + this.currentCaseID$ );
      console.log('state-->' + JSON.stringify(this.state ));
      // console.log('currentCaseID-->' +this.currentCaseID$ );



      // this.cservice.createCase(this.currentCaseID$, this.state).subscribe(
      this.cservice.createCase(this.currentCaseID$, this.state).subscribe(
        response => {


          const caseID = response.body['ID'];
          const caseName = caseID.split(' ')[1];

          const oAssignment = new Object();
          oAssignment['pxRefObjectInsName'] = caseName;
          oAssignment['pzInsKey'] = response.body['nextAssignmentID'];


          console.log('  Created caseName caseID-->' + caseID);
          console.log('  Created caseName caseName -->' + caseName);
          console.log('  Created caseName oAssignment-->' + JSON.stringify(oAssignment));

          // renaming tab
          // MPG this.rtservice.sendMessage("New", caseName);

          // so renaming the tab, causes the tab to reload
          // so we need to send it a message to open the assigment, because
          // it lost it with the reload
          // MPG this.oaservice.sendMessage(caseName, oAssignment);
          // this.gnservice.sendMessage(caseName, oAssignment);
            this.gnservice.sendMessage(this.currentCaseID$);
            this.oaservice.sendMessage(caseName, oAssignment);

          // new item created, update worklist
         // MPG  this.rwlservice.sendMessage('Work');
         this.rwlservice.sendMessage('Work');
         this.gaservice.sendMessage(caseID, oAssignment);


        },
        err => {
          this.isProgress = false;
          this.handleErrors(err);
        }
      );

    }


    openAss() {
      const row = this.WB1;
      console.log(this.componentName + ' OpenAss() ' + JSON.stringify(row));
      this.oaservice.sendMessage(row.pxRefObjectInsName, row);

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
