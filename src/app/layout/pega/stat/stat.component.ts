import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
    @Output() event: EventEmitter<any> = new EventEmitter();

    constructor( public router: Router) {
  }

    ngOnInit() {
    }
}
