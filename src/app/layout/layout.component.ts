import { PegaVariablesPropertiesComponent } from '@ss/pega-shared/pega-variables-properties.component';

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

  constructor(
    private ps: PegaVariablesPropertiesComponent
  ) { }
  nameLayout = new FormControl('');
  OnInit() {
   //this.ps.buildRgbaPalette();
  }
  ngOnInit() {
    //this.ps.buildRgbaPalette();

   // console.log(this.componentName + ' LS --> userName -->' + localStorage.getItem('userName'));
   // console.log(this.componentName + ' LS --> displayUserName -->' + localStorage.getItem('displayUserName'));
   // console.log(this.componentName + ' LS -- lastAccess-->' + localStorage.getItem('lastAccess'));

  //  this.ps.hexToRGBa('#225522');
  //  this.ps.hexToRGBa('#542254');
  //  this.ps.buildRgbaPalette();

  }

  receiveCollapsed($event) {
    this.collapedSideBar = $event;
  }
}
