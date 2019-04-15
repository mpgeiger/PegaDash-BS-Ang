// import { MatTableDataSource } from '@angular/material';
// import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
// import { CaselistComponent } from './../../../.history/src/app/layout/pega/caselist/caselist.component_20190415063325';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
// import { CaselistComponent } from '../layout/pega/caselist/caselist.component';
import { CaselistComponent, RecentTreasurerCaseListComponent } from '../layout/pega';
// import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
// import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';

@NgModule({
  imports: [
   CommonModule
   , MatInputModule
   , MatFormFieldModule
   , MatTableModule
   , MatPaginatorModule
   , MatSortModule
  ],
  providers: [
    // CaselistComponent
  ],
  declarations: [
    CaselistComponent
    , RecentTreasurerCaseListComponent
    // , MatTableDataSource
    // , MatPaginator
  ],
  exports: [
    MatFormFieldModule
    , MatInputModule
    , MatTableModule
    , MatPaginatorModule
    , MatSortModule
    , CaselistComponent
    , RecentTreasurerCaseListComponent
    // , MatTableDataSource
    // , MatPaginator

  ]
})
export class SharedPegaModule { }
