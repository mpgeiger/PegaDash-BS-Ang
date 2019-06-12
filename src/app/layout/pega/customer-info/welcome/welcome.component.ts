// import { RelAccountListComponent } from './../../rel-account-list/rel-account-list.component';
// import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
// import { RelAccountListComponent } from '@ss/app/shared-pega/shared-pega.module';
import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { PegaSessionService } from '@ss/app/layout/pega/_services/index';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy  {
  subscription: Subscription;
  subscriptionDisplayName: Subscription;

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
  acctsSummary = {};
  userInfo = {};
  showLoading = false;

  constructor(
    // private al: RelAccountListComponent
    private as: PegaSessionService,
    // private changeDetectorRef: ChangeDetectorRef,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {

    this.subscriptionDisplayName = this.as.getUserDisplayName().subscribe( message => {
      if (message) {
        this.messages.push(message);
        this.userInfo = message;
        // console.log(this.componentName + ' getUserDisplayName _displayName -->' + JSON.stringify(this.userInfo));
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });

    this.subscription = this.as.getAccountList().subscribe(message => {
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

//  displayUserName = '';
// mpgTest = {};


  ngOnInit() {
    //console.log(' welcome.component lastAccess-->' + this.lastAccess);
    // this.showLoading = true;
    // setInterval(() => {
    //   this.changeDetectorRef.markForCheck();
    // }, 5000);
  }
  ngAfterViewInit(): void {


  }


ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.subscription.unsubscribe();
}

}
