// import { StatComponent } from './../../../../shared/modules/stat/stat.component';
import { Component, OnInit, Input, OnChanges, AfterViewInit, SimpleChanges } from '@angular/core';
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


  constructor() { }
  componentName = 'customer-info/welcom.component';
  @Input('FullName') fullName: string;
  @Input('LastAccess') lastAccess: string;
  // @Input('LastAccess') lastAccess: string;
  @Input() totalCurrentAssets: number;
  @Input() totalCurrentLiabilities: number;
  @Input() totalAvgMonthAssets: number;
  @Input() totalAvgMonthLiabilities: number;

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


    // if (changes.currentValue) {
    //     this.totalCurrentAssets = chang;
    // }
}

}
