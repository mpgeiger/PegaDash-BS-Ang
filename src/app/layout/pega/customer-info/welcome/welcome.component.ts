// import { RelAccountListComponent } from './../../rel-account-list/rel-account-list.component';
// import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { Component, OnInit, Input, OnDestroy, OnChanges, AfterViewInit, SimpleChanges, SimpleChange } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
// import { RelAccountListComponent } from '@ss/app/shared-pega/shared-pega.module';
import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { AccountListService } from '@ss/app/layout/pega/_services/index';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit, OnDestroy  {
  subscription: Subscription;
  subscriptionDisplayName: Subscription;

  // totalCurrentLiabilities: number = Number(localStorage.getItem('totalCurrentLiabilities'));
  // totalAvgMonthLiabilities = Number(localStorage.getItem('totalAvgMonthLiabilities'));
  // totalCurrentAssets = Number(localStorage.getItem('totalCurrentAssets'));
  // totalAvgMonthAssets = Number(localStorage.getItem('totalAvgMonthAssets'));

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
  showLoading = true;

  constructor(
    // private al: RelAccountListComponent
    private as: AccountListService
  ) {
    this.subscription = this.as.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
        console.log(this.componentName + ' GETTING message-->' + JSON.stringify(message));

      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });
    this.subscription = this.as.getAccountList().subscribe(message => {
      if (message) {
        this.messages.push(message);
        console.log(this.componentName + ' GETTING ACCOUNT SUMMARY message-->' + JSON.stringify(message));
this.acctsSummary = message;
this.showLoading = false;
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });

    this.subscriptionDisplayName = this.as.getUserDisplayName().subscribe( message => {
      if (message) {
        this.messages.push(message);

        this.userInfo = message;

        console.log(this.componentName + ' GETTING ACCOUNT SUMMARY _displayName -->' + JSON.stringify(this.userInfo));
      } else {
        // clear messages when empty message received
        this.messages = [];
      }
    });


  }

 displayUserName = '';
mpgTest = {};


  ngOnInit() {
    console.log(' welcome.component lastAccess-->' + this.lastAccess);
    this.showLoading = true;
  }
  ngAfterViewInit(): void {
    this.displayUserName =  localStorage.getItem('displayUserName');
  }

  ngOnChanges(changes: SimpleChanges) {
    for (const propName in changes) {
      const change = changes[propName];
      const curVal  = JSON.stringify(change.currentValue);
      const prevVal = JSON.stringify(change.previousValue);
      console.log(this.componentName + '   Prev Val-->' + prevVal + '____Current-->' + curVal);

      if (curVal !== prevVal) {
        console.log(this.componentName + '\t\t NOT same!');
      }
         }

        //  const sc_totalCurrentAssets: SimpleChange = changes.totalCurrentAssets;

        //  console.log(' Simple Change ' + sc_totalCurrentAssets.currentValue + '-->' + this._totalCurrentAssets );
        //  this._totalCurrentAssets = sc_totalCurrentAssets.currentValue;



    // if (changes.currentValue) {
    //     this.totalCurrentAssets = chang;
    // }
}

ngOnDestroy() {
  // unsubscribe to ensure no memory leaks
  this.subscription.unsubscribe();
}

}
