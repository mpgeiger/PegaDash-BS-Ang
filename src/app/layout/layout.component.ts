
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { MegaMenuComponent } from './pega/mega-menu/mega-menu.component';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

    collapedSideBar: boolean;

    constructor() {}
    nameLayout = new FormControl('');
    ngOnInit() {}

    receiveCollapsed($event) {
        this.collapedSideBar = $event;
    }
}
