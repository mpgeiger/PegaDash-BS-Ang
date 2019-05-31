import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { PegaVariablesPropertiesComponent } from '../../../shared-pega/pega-variables-properties/pega-variables-properties.component';

@Component({
  selector: 'app-nba-capture-response',
  templateUrl: './nba-capture-response.component.html',
  styleUrls: ['./nba-capture-response.component.scss']
})
export class NbaCaptureResponseComponent implements OnInit {

  constructor(
    private pega: PegaVariablesPropertiesComponent
    ) { }

    xxx_advice_NBA_Header = '';

    @Input('RMName') rmName: string;
    @Input('OfferName') offerName: string;
    @Input('Message') message: string;
    @Input('Status') status: string;
    @Input('CaseID') caseID: string;
    @Input('showLoading') showLoading: boolean;


    ngOnInit() {
      console.log('');
    }

    OnInit() {
      this.xxx_advice_NBA_Header = this.pega.pega_NBA_Advice_Header;

    }

}
