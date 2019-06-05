// import { RelAccountListComponent } from './../../rel-account-list/rel-account-list.component';
// import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { Component, OnInit, Input, OnChanges, AfterViewInit, SimpleChanges, SimpleChange } from '@angular/core';
// import { RelAccountListComponent } from '@ss/app/shared-pega/shared-pega.module';
import { StatComponent } from './../../../../shared/modules/stat/stat.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, AfterViewInit  {

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

  constructor(
    // private al: RelAccountListComponent
  ) { }

 displayUserName = '';



  ngOnInit() {
    console.log(' welcome.component lastAccess-->' + this.lastAccess);
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

         const sc_totalCurrentAssets: SimpleChange = changes.totalCurrentAssets;

         console.log(' Simple Change ' + sc_totalCurrentAssets.currentValue + '-->' + this._totalCurrentAssets );
         this._totalCurrentAssets = sc_totalCurrentAssets.currentValue;



    // if (changes.currentValue) {
    //     this.totalCurrentAssets = chang;
    // }
}

}
