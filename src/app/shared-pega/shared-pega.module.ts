// import { EmailByCategoryComponent } from './../layout/pega/kpi-report/email-by-category/email-by-category.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NbaTeaserComponent } from './../layout/pega/nba-teaser/nba-teaser.component';
// import { ModalComponent } from './../layout/bs-component/components/modal/modal.component';
// import { OpenAssignmentService } from './../_messages/openassignment.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

// import { ChartDataLabels } from 'chartjs-plugin-datalabels';

import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedPegaStarterPackModule } from './shared-pega-starterPackItems.module';
import {
   CaselistComponent
  // , FileNameDialogComponent
  // , ModalContainerComponent
  , MegaMenuComponent
  , ModalRCIContainerComponent
  , CreateCustomRCIcaseComponent
  , EmailByCategoryComponent

  , InCorrAutoReplyTrendComponent
  , NbaOfferComponent
  , OpenByWorkTypeComponent
  , PegaPieChartComponent
  , RecentInteractionsComponent
  , RecentTreasurerCaseListComponent
  , RelAccountListComponent
  , StatusRecentTreasurerComponent
  , TransactionSummaryComponent
  , WorkitemComponent
  , PWorkItemComponent
  , ValueTrendIndicatorArrowComponent
  , Workitem1Component
  , ModalWorkItemComponent
  // , HeroChildComponent
} from '../layout/pega';

// import { HeroParentComponent } from '../layout/components/header/header.component';
@NgModule({
  imports: [
    FormsModule
   , ReactiveFormsModule
   , CommonModule
   , AppMaterialModule
   , SharedPegaStarterPackModule
   , Ng2Charts

  ],
  providers: [
    // CaselistComponent
  ],
  declarations: [
    CaselistComponent
    // , FileNameDialogComponent
    // , ModalContainerComponent
    , MegaMenuComponent
    , ModalRCIContainerComponent
    , CreateCustomRCIcaseComponent
    , EmailByCategoryComponent
    , InCorrAutoReplyTrendComponent
    // , ChartDataLabels
    , ModalWorkItemComponent
    , NbaOfferComponent
    , NbaTeaserComponent
    , OpenByWorkTypeComponent
    , PegaPieChartComponent
    , RecentInteractionsComponent
    , RecentTreasurerCaseListComponent
    , RelAccountListComponent
    , StatusRecentTreasurerComponent
    , TransactionSummaryComponent
    , ValueTrendIndicatorArrowComponent
    , WorkitemComponent
    , PWorkItemComponent
    , Workitem1Component
    // , HeroParentComponent
    // , HeroChildComponent
  ],
  exports: [
      CaselistComponent
      // , FileNameDialogComponent
      // , ModalContainerComponent
      , MegaMenuComponent
      , ModalRCIContainerComponent
      , CreateCustomRCIcaseComponent
      , EmailByCategoryComponent
      , InCorrAutoReplyTrendComponent

    // , ChartDataLabels
    , NbaOfferComponent
    , NbaTeaserComponent
    , OpenByWorkTypeComponent
    , PegaPieChartComponent
    , RecentInteractionsComponent
    , RecentTreasurerCaseListComponent
    , RelAccountListComponent
    , StatusRecentTreasurerComponent
    , TransactionSummaryComponent
    , WorkitemComponent
    , PWorkItemComponent
    , ValueTrendIndicatorArrowComponent
    , Workitem1Component
    , ModalWorkItemComponent
    // , HeroParentComponent
    // , HeroChildComponent
  ],
  entryComponents: [
  //  FileNameDialogComponent
  //  , ModalContainerComponent
    ModalRCIContainerComponent
   , CreateCustomRCIcaseComponent
   , WorkitemComponent
   , ModalWorkItemComponent
  //  , HeroParentComponent
    // , HeroChildComponent
  ]
})
export class SharedPegaModule { }
