import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
@Component({
    selector: 'app-pstat',
    templateUrl: './stat.component.html',
    styleUrls: ['./stat.component.scss']
})
export class PStatComponent implements OnInit {
    @Input() bgClass: string;
    @Input() icon: string;
    @Input() count: number;
    @Input() label: string;
    @Input() type: string;
    @Input() data: number;
    @Input() amount: number;
    @Input() showLoading: boolean;
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor( public router: Router,
      private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ) {
      this.matIconRegistry.addSvgIcon(
        'trend-up',
        '../../../../assets/images/trending-up.svg'
      );
      this.matIconRegistry.addSvgIcon(
        'trend-down',
        '../../../../assets/images/trending-down.svg'
      );
      this.matIconRegistry.addSvgIcon(
        'trend-up',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/images/trending-up.svg')
      );
      this.matIconRegistry.addSvgIcon(
        'trend-down',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/images/trending-down.svg')
      );
  }

    ngOnInit() {
    }
}
