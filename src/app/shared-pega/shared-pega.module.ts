import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { AppMaterialModule } from '../app-material/app-material.module';
import { CaselistComponent, NbaOfferComponent, PegaPieChartComponent, RecentTreasurerCaseListComponent, TransactionSummaryComponent } from '../layout/pega';

@NgModule({
  imports: [
   CommonModule
   , AppMaterialModule
   , Ng2Charts

  ],
  providers: [
    // CaselistComponent
  ],
  declarations: [
    CaselistComponent
    , NbaOfferComponent
    , PegaPieChartComponent
    , RecentTreasurerCaseListComponent
    , TransactionSummaryComponent
  ],
  exports: [
      CaselistComponent
    , NbaOfferComponent
    , PegaPieChartComponent
    , RecentTreasurerCaseListComponent
    , TransactionSummaryComponent
  ]
})
export class SharedPegaModule { }
