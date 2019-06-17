
import { ServerErrorComponent } from './../../server-error/server-error.component';
import { SharedPegaModule } from './../../shared-pega/shared-pega.module';

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, FormControl } from '@angular/forms';

import { PegaVariablesPropertiesComponent, UserAttributes } from '@ss/pega-shared/pega-variables-properties.component';

import { PegaSessionService } from '@ss/app/layout/pega/_services/index';
// import { DOperatorIDService } from '@ss/pega-layout/_services/service-d_operatorId.service';
import { DOperatorIDService } from '../../layout/pega/_services/service-d_operatorId.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

// @JsonProperty('value') _value:
// interface ObsRespValue {
//   @JsonProperty('pyUserName') pyUserName:  string;
//   @JsonProperty('pyLastSignon') pyLastSignon: string;
// }

// interface ObsRespSource {

// }
// interface ObsSource {
//   _value: Object;
// }
@Component({
  selector: 'app-summary-page',
  templateUrl: './summary-page.component.html',
  styleUrls: ['./summary-page.component.scss'],
  animations: [routerTransition()]
})

export class SummaryPageComponent implements OnInit {

  constructor(
    private pv: PegaVariablesPropertiesComponent,
    private ps: PegaSessionService,
    private d_OpId: DOperatorIDService
  ) { }
  componentName = 'summary-page.component';
  userName = '';
  displayUserName = 'displayUserName placeholder';
  lastAccess = 'lastAccess placeholder';

  subscriptionUserAttributes: Subscription;
  messages: any[] = [];
  oUserAttributes: any = {};
  userAttributesObject = {} as UserAttributes;
  allData$: Observable<{}>;
  allData: {};


  /*
*
*/
  pega_NBA_Header = '';
  customer_Abbreviation = '';


  numUnifiedTaskList$ = '';
  D_RecentTreasurerCases$ = '';
  D_TransactionSummary$ = '';
  cases$ = '';
  nameSummaryPage = new FormControl('');
 // foo.

    // this.allData$ = this.allData$.source.
    // console;
  // ngOnInit() {}
  ngOnInit() {


    // const foo = new BehaviorSubject({});
    // this.pv.getUserAttr();
    // this.userAttributes = this.pv.userAttributes;
    // console.log(this.componentName + ' this.pv.getUserAttr()  ngOnInit ___' + JSON.stringify(this.userAttributes));
    // this.userAttributesObject = this.pv.userAttributesObject;
    // console.log(this.componentName + ' this.pv.userAttributesObject  ngOnInit ___' + JSON.stringify(this.userAttributesObject));

    this.d_OpId.initializeDataService();
    this.allData = this.d_OpId.subscribeToDataService();
    this.allData$ = this.d_OpId.subscribeToDataService();
    // foo = this.allData$.json();
    let fooUserAttributes: any = {};
    let fooNV: any = {};

    this.ps.getUserAttributes().subscribe((res: {}) => {
        fooUserAttributes = res;

        fooNV = this.pv.convertArray2Object(fooUserAttributes);
        //this.oUserAttributes = res[1];
        this.oUserAttributes = this.pv.convertArray2Object(fooUserAttributes);
        console.log(this.componentName + '___subscribeToDataService-fooNV-' + JSON.stringify(fooNV));
        console.log(this.componentName + '___subscribeToDataService-foo-' + JSON.stringify(fooUserAttributes));
        console.log(this.componentName + '___subscribeToDataService-oUserAttributes-' + JSON.stringify(this.oUserAttributes));
    });

    console.log(this.componentName + '___subscribeToDataService--' + JSON.stringify(this.allData));
    console.log(this.componentName + '___subscribeToDataService$$$$--' + JSON.stringify(this.allData$));
  }

  // getSub(): any {
  //   this.subscription = this.ps.getAccountList().subscribe(message => {

  //   if (message) {
  //     this.messages.push(message);

  //     // console.log(this.componentName + ' GETTING ACCOUNT SUMMARY message-->' + JSON.stringify(message));
  //     this.acctsSummary = message;
  //     this.showLoading = false;
  //   } else {
  //     // clear messages when empty message received
  //     this.messages = [];
  //   }
  // });


  // }


  ngAfterViewInit(): void {
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.

    // console.log(this.componentName + ' ngOnInit PegaVariablesPropertiesComponent--' + JSON.stringify(this.pv.userAttributes));


  }
  // getSubscribeToDataService() {
  //   this.subscription = this.ps.getAccountList().subscribe(message => {
  //     if (message) {
  //       this.messages.push(message);

  //       // console.log(this.componentName + ' GETTING ACCOUNT SUMMARY message-->' + JSON.stringify(message));
  //       this.acctsSummary = message;
  //       this.showLoading = false;
  //     } else {
  //       // clear messages when empty message received
  //       this.messages = [];
  //     }
  //   });
  // }


}

