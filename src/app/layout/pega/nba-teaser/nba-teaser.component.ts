import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nba-teaser',
  templateUrl: './nba-teaser.component.html',
  styleUrls: ['./nba-teaser.component.scss']
})
export class NbaTeaserComponent implements OnInit {

  constructor() { }
  @Input('EligibilityDescription') headline: string;
  @Input('WebMessage') subHeader: string;


  ngOnInit() {
  }

}
