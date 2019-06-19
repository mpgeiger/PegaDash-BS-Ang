
// import { RelAccountListComponent } from './../../rel-account-list/rel-account-list.component';
// import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { RelAccountListComponent } from '@ss/app/shared-pega/shared-pega.module';
// import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { PegaSessionService } from '@ss/app/layout/pega/_services/index';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { IoUserAttribute, IaUserAttributes } from '@ss/pega-layout/_interfaces';



//  interface UserAttributeTypeType {
//   name: string;
//   value: string | number;
// }

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy  {
  subscription: Subscription;
  subscriptionDisplayName: Subscription;
  subscriptionUserAttributes: Subscription;

  componentName = 'customer-info/welcome.component';
  @Input('FullName') fullName: string;
  @Input('LastAccess') lastAccess: string;
  // @Input('LastAccess') lastAccess: string;
  @Input() totalCurrentAssets: number;
  @Input() totalCurrentLiabilities: number;
  @Input() totalAvgMonthAssets: number;
  @Input() totalAvgMonthLiabilities: number;

  private _totalCurrentAssets: number;

  messages: any[] = [];
  messagesAU: any[] = [];
  acctsSummary = {};


//  displayUserName = '';
// mpgTest = {};

  foobar: string | number  = '';
  foobar2: string | number  = '';

  userAttributes: IaUserAttributes[] = [];

  userInfo = {};
  showLoading = false;

  constructor(
    // private al: RelAccountListComponent
    private ps: PegaSessionService,
    // private changeDetectorRef: ChangeDetectorRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {

    // this.subscriptionDisplayName = this.ps.getUserDisplayName().subscribe( message => {
    //   if (message) {
    //     this.messages.push(message);
    //     this.userInfo = message;
    //     // console.log(this.componentName + ' getUserDisplayName _displayName -->' + JSON.stringify(this.userInfo));
    //   } else {
    //     // clear messages when empty message received
    //     this.messages = [];
    //   }
    // });


    this.matIconRegistry.addSvgIcon(
      'trend-up',
      '../../../../../assets/images/trending-up.svg'
    );
    this.matIconRegistry.addSvgIcon(
      'trend-down',
      '../../../../../assets/images/trending-down.svg'
    );
    this.matIconRegistry.addSvgIcon(
      'trend-up',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/trending-up.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'trend-down',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../../assets/images/trending-down.svg')
    );




  }


  ngOnInit() {
    this.getAccountsSummary();

    this.getUserAttributes();


    // console.log(' welcome.component lastAccess-->' + this.lastAccess);
    // this.showLoading = true;
    // setInterval(() => {
    //   this.changeDetectorRef.markForCheck();
    // }, 5000);
  }


  ngAfterViewInit(): void {
    // const u1 = {} as IoUserAttribute;
    // const u2 = {} as IoUserAttribute;

    // u1 = this.getUserAttr('userFullName');
    // u2 = this.getUserAttr('lastAccess');
    // console.log(this.componentName + ' getUserAttributes  ngOnInit getUserAttr Value--lastAccess___' + JSON.stringify(u2));
    // console.log(this.componentName + ' getUserAttributes  ngOnInit getUserAttr Value--lastAccess___' + u2.value);

    // this.getUserAttr('userFullName');
    // this.getUserAttr('lastAccess');
  }

  getAccountsSummary() {
    this.subscription = this.ps.getAccountList().subscribe(message => {
      if (message) {
        this.messages.push(message);

        // console.log(this.componentName + ' GETTING ACCOUNT SUMMARY message-->' + JSON.stringify(message));
        this.acctsSummary = message;
        this.showLoading = false;
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
  }

  getUserAttributes() {
// const u1 = {} as IoUserAttribute;
// const u2 = {} as IoUserAttribute;
//     this.subscriptionUserAttributes = this.ps.getUserAttributes().subscribe( message => {
//         if (message) {
//           this.messagesAU.push(message);
//           this.userAttributes = message;
//          console.log(this.componentName + ' getUserAttributes _displayName -->' + JSON.stringify(this.userAttributes));

//         } else {
//           // clear messages when empty message received
//           this.messagesAU = [];
//         }

//         this.foobar = this.getUserAttr('displayUserName').value;
//         this.foobar2 = this.getUserAttr('lastAccess').value;
// console.log(this.componentName + 'foobar-->' + this.foobar);
// console.log(this.componentName + 'lastAccess-->' + this.foobar2);
        // u1 = this.getUserAttr('userFullName');
        // u2 = this.getUserAttr('lastAccess');

        // console.log(this.componentName + ' getUserAttributes userFullName -->' +  JSON.stringify(u1));
        // console.log(this.componentName + ' getUserAttributes _lastAccess -->' +  JSON.stringify(u2)  );
        // /console.log(this.componentName + ' getUserAttributes _lastAccess -->' +  JSON.stringify(u2) + '___' + u2.value );
      // })


  }

  // getUserAttr(nameValue: string): IoUserAttribute {
  //   const item1 = this.userAttributes.find(i => {
  //     return i.name === nameValue;
  //   });
  //   // console.log(this.componentName + ' getUserAttributes getUserAttr--' + nameValue + '___' + JSON.stringify(item1));
  //   // console.log(this.componentName + ' getUserAttributes getUserAttr Value--' + nameValue + '___' + item1);
  //   return item1;
  // }


ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.subscription.unsubscribe();
}

}
