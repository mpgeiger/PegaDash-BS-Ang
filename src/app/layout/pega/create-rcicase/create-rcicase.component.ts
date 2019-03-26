// import { CaseService } from './../../../_services/case.service';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PegaErrors } from '../../../_constants/PegaErrors';
import { CaseService } from '../../../_services/case.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
// import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// import { DatapageService } from '../../../../_services/datapage.service';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

  const checkRecipientList = [

   'New Wave Energy Solutions'
  , 'New Wave Europe Ltd.'
  , 'New Wave Americas Inc.'
  , 'New Wave Equity'
  , 'New Wave Asia Ltd.'
];
  const checkSenderList = [
    'Sally Jones'
    , 'Siam Industries'
  , 'Singer Foundation'
  , 'New Wave'
  , 'Bank of NY Mellon'
  , 'Sea Industries Ltd.'
  , 'Sun Investment Inc.'
  , 'Stellar Corporation Ltd.'
];


@Component({
  selector: 'app-create-rcicase',
  templateUrl: './create-rcicase.component.html',
  styleUrls: ['./create-rcicase.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush
})


@Injectable() // class annotation as Injectable

export class CreateRCIcaseComponent {

  model;
  currentCaseID$ = 'PegaCPMFS-Work-RequestCheckImage';
  getActiveStep = 'Credited';
  isLoaded = false;
  isProgress = true;
  isView = false;
  isPage = false;
  isNewPage = false;
  chevronCurrentStage = 'complete';
  isCollapsed = true;
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
  term = '';
  constructor(
    // private fb: FormBuilder,
    private cservice: CaseService
  ) { }

  createNew() {
    // if (this.tpComp.formValid()) {
      // $('bcActive').active();
      // this.isProgress = true;
console.log(' IN CREATE RCI');
      // this.state = this.rciObj.content;
      this.caseData.Month = 'March';
      this.caseData.CheckRecepient = 'New Wave Americas Inc.';
      this.caseData.CheckSender = 'Sun Investment Inc.';

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

    // fieldChangedTypeAhead(e) {
    //   this.caseData[e.target.id] = e.target.value;
    // }




    searchCheckRecipient = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : checkRecipientList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

    searchCheckSender = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : checkSenderList.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )


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


