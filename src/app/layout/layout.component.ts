
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { MegaMenuComponent } from './pega/mega-menu/mega-menu.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  componentName = 'layout.component';
  collapedSideBar: boolean;
  displayUserName = localStorage.getItem('displayUserName');

  constructor() { }
  nameLayout = new FormControl('');
  ngOnInit() {
    console.log(this.componentName + ' LS --> userName -->' + localStorage.getItem('userName'));
    console.log(this.componentName + ' LS --> displayUserName -->' + localStorage.getItem('displayUserName'));
    console.log(this.componentName + ' LS -- lastAccess-->' + localStorage.getItem('lastAccess'));

  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
