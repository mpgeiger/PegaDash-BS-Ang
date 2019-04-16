// import { MatTableDataSource } from '@angular/material';
// import { MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
// import { CaselistComponent } from './../../../.history/src/app/layout/pega/caselist/caselist.component_20190415063325';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
// import { Label as ng2Labels } from 'ng2-charts';

// import { ChartsRoutingModule } from './charts-routing.module';
// import { ChartsComponent } from './charts.component';

// import { CaselistComponent } from '../layout/pega/caselist/caselist.component';
import { CaselistComponent, PegaPieChartComponent, RecentTreasurerCaseListComponent } from '../layout/pega';
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
   , Ng2Charts
  //  , ng2Labels
  ],
  providers: [
    // CaselistComponent
  ],
  declarations: [
    CaselistComponent
    , PegaPieChartComponent
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
    , PegaPieChartComponent
    , RecentTreasurerCaseListComponent
    // , MatTableDataSource
    // , MatPaginator

  ]
})
export class SharedPegaModule { }
