import { Component, Input, OnInit } from '@angular/core';
import { PegaVariablesPropertiesComponent } from '../../../shared-pega/pega-variables-properties/pega-variables-properties.component';

@Component({
  selector: 'app-nba-teaser',
  templateUrl: './nba-teaser.component.html',
  styleUrls: ['./nba-teaser.component.scss']
})
export class NbaTeaserComponent implements OnInit {
  header_NBA = '';

  constructor(
    private pega: PegaVariablesPropertiesComponent

  ) { }
  @Input('EligibilityDescription') headline: string;
  @Input('WebMessage') subHeader: string;



  ngOnInit() {
    this.header_NBA = this.pega.pega_NBA_Advice_Header;
  }
}
