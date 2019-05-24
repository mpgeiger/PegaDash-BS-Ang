import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  // totalCurrentLiabilities: number = Number(localStorage.getItem('totalCurrentLiabilities'));
  // totalAvgMonthLiabilities = Number(localStorage.getItem('totalAvgMonthLiabilities'));
  // totalCurrentAssets = Number(localStorage.getItem('totalCurrentAssets'));
  // totalAvgMonthAssets = Number(localStorage.getItem('totalAvgMonthAssets'));


  constructor() { }
  @Input('FullName') fullName: string;
  @Input('LastAccess') lastAccess: string;
  // @Input('LastAccess') lastAccess: string;
  @Input() totalCurrentAssets: number;
  @Input() totalCurrentLiabilities: number;
  @Input() totalAvgMonthAssets: number;
  @Input() totalAvgMonthLiabilities: number;




  ngOnInit() {
    console.log(' welcome.component lastAccess-->' + this.lastAccess);
  }

}
