import { Component, OnInit, Input } from '@angular/core';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-nba-capture-response',
  templateUrl: './nba-capture-response.component.html',
  styleUrls: ['./nba-capture-response.component.scss']
})
export class NbaCaptureResponseComponent implements OnInit {

  constructor() { }
  @Input('Message') message: string;
  @Input('Status') status: string;
  @Input('CaseID') caseID: string;

  ngOnInit() {
  }


}
