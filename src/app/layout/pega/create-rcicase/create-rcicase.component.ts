// import { CaseService } from './../../../_services/case.service';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PegaErrors } from '../../../_constants/PegaErrors';
import { CaseService } from '../../../_services/case.service';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import { DatapageService } from '../../../../_services/datapage.service';

@Component({
  selector: 'app-create-rcicase',
  templateUrl: './create-rcicase.component.html',
  styleUrls: ['./create-rcicase.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})


@Injectable() // class annotation as Injectable

export class CreateRCIcaseComponent {

  currentCaseID$ = 'PegaCPMFS-Work-RequestCheckImage';

  isLoaded = false;
  isProgress = true;
  isView = false;
  isPage = false;
  isNewPage = false;
  // Month: Object = new Object();

  state: Object = new Object();
  rciObj = 	{content : {
		Amount : '321.12',
		CheckRecepient : 'ACME Fin',
		CheckSender : 'Sally Jones',
		DaytimePhoneNumber : '555-867-5309',
		Month : 'August'
  }};

  myObjStr = JSON.stringify(this.rciObj);

  caseData: any = {};
  showMsg = false;
  constructor(
    // private fb: FormBuilder,
    private cservice: CaseService
  ) { }

  createNew() {
    // if (this.tpComp.formValid()) {

      // this.isProgress = true;
console.log(' IN CREATE RCI');
      // this.state = this.rciObj.content;
      this.state = this.caseData;
      console.log('currentCaseID-->' + this.currentCaseID$ );
      console.log('state-->' + JSON.stringify(this.state ));

      this.cservice.createCase(this.currentCaseID$, this.state).subscribe(
        response => {


          const caseID = response.body['ID'];
          const caseName = caseID.split(' ')[1];

          const oAssignment = new Object();
          oAssignment['pxRefObjectInsName'] = caseName;
          oAssignment['pzInsKey'] = response.body['nextAssignmentID'];
          this.showMsg = true;
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

    fieldChanged(e) {
      this.caseData[e.target.id] = e.target.value;
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


