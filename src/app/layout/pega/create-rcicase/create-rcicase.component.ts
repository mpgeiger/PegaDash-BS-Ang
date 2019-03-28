// import { OnInit } from '@angular/core';
// import { CaseService } from './../../../_services/case.service';
import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PegaErrors } from '../../../_constants/PegaErrors';
import { CaseService } from '../../../_services/case.service';
import {Observable} from 'rxjs';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { diPublic } from '@angular/core/src/render3/di';
import { JsonPipe } from '@angular/common';
import { StringDecoder } from 'string_decoder';
import { stringify } from '@angular/core/src/util';
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
  , 'New Wave Equity'
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
// const myNbgDateMMddYYYY = {'month': 6, 'day': 23, 'year': 2019};
export class CreateRCIcaseComponent implements OnInit {
  constructor(
    // private fb: FormBuilder,
    private cservice: CaseService
  ) { }

  // model;
  // model: ModalComponentModel=<CreateRCIcaseComponent>{};
  model: CreateRCIcaseComponent = <CreateRCIcaseComponent>{};
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

  // dor Approx Date field
  // myNbgDate: myNbgDateMMddYYYY;
  myObject2 = {month: 6, day: 23, year: 2019};
  // dp: {'year': 2019, 'month': 6, 'day': 23};
  dpModel: any;


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
  ngOnInit(): void {
    this.setDp();
    // throw new Error('Method not implemented.');
  }
  // ngOnInit(): void {
  //   throw new Error("Method not implemented.");
  // }
  OnInit (): void {
  //  console.log(' create-rcicase.ts onChange1-->' + JSON.stringify(this.myObject2));
   // this.dp = this.myObject2;
   // console.log(' create-rcicase.ts onChange1-->' + JSON.stringify(this.dpModel));
    // this.model.dp(this.myObject2);
    this.setDp();
}
setDp() {
  const today = Date.now();
  // const pastOneWeek = new Date((new Date(today)).getTime() - (60 * 60 * 24 * 7 * 1000));
  const pastOneWeek = new Date(new Date(today));
  console.log('past one week-->' + pastOneWeek);
  const day = pastOneWeek.getUTCDate() - 7;
  const month = pastOneWeek.getUTCMonth() + 1;
  const year = pastOneWeek.getUTCFullYear();
  console.log('past one week day-->' + day);
  this.myObject2.day = day;
  this.myObject2.month = month;
  this.myObject2.year = year;

  console.log('past one week myObject2-->' + JSON.stringify(this.myObject2));

  this.dpModel = {'year': year, 'month': month, 'day': day};

}


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

    onChange1(dpInput: any) {
      const myObject = {date: new Date(1, 9, 2016)};
      const myObject2 = {'month': 3, 'day': 23, 'year': 2019};
      console.log(' create-rcicase.ts onChange1-->' + JSON.stringify(dpInput));
      this.model.dpModel(myObject2);
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




