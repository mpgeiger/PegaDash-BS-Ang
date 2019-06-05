import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NbaTeaserComponent } from './../layout/pega/nba-teaser/nba-teaser.component';
import { NbaCaptureResponseComponent } from './../layout/pega/nba-capture-response/nba-capture-response.component';
// import { ModalComponent } from './../layout/bs-component/components/modal/modal.component';
// import { OpenAssignmentService } from './../_messages/openassignment.service';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

// import { ChartDataLabels } from 'chartjs-plugin-datalabels';

import { AppMaterialModule } from '../app-material/app-material.module';
import { SharedPegaStarterPackModule } from './shared-pega-starterPackItems.module';
import { RciMashupComponent, WireRecallMashupComponent } from '../layout/pega/mashups/rci-mashup/rci-mashup.component';
import { SafeHtml, SafeStyle, SafeUrl } from '../layout/pega/_pipes/safe';
import { WelcomeComponent } from '../layout/pega/customer-info/welcome/welcome.component';
// import { PStatModule } from '../layout/pega/stat/stat.module';
import { FilterPipe } from '../layout/pega/_pipes/searchFilterPipe';
import { PegaVariablesPropertiesComponent } from './pega-variables-properties/pega-variables-properties.component';

import {
     AccountSummaryComponent
   , CaselistComponent
  // , FileNameDialogComponent
  // , ModalContainerComponent
  , CreateCustomRCIcaseComponent
  , EmailByCategoryComponent
  , HomePageComponent

  , InCorrAutoReplyTrendComponent
  , MegaMenuComponent
  // , ModalContainerComponent
  , ModalRCIContainerComponent
  , ModalRCIPegaComponent
  , ModalWorkItemComponent
  , NbaOfferComponent
  , OpenByWorkTypeComponent
  , PegaPieChartComponent
  , PStatComponent
  // , PStatModule
  , RecentInteractionsComponent
  , RecentTreasurerCaseListComponent
  , RelAccountListComponent
  , RciCheckResultTableComponent
  , StatusRecentTreasurerComponent
  , TransactionSummaryComponent
  , TransactionSummaryKpiComponent
  , WorkitemComponent
  , PWorkItemComponent
  , ValueTrendIndicatorArrowComponent
  , Workitem1Component
  // , HeroChildComponent
} from '../layout/pega';

// import { HeroParentComponent } from '../layout/components/header/header.component';
@NgModule({
  imports: [
    FormsModule
   , ReactiveFormsModule
   , CommonModule
   , AppMaterialModule
  //  , PStatModule
   , SharedPegaStarterPackModule
   , Ng2Charts

  ],
  providers: [
    // CaselistComponent
    PegaVariablesPropertiesComponent
  ],
  declarations: [
    AccountSummaryComponent
   , CaselistComponent
    // , FileNameDialogComponent
    // , ModalContainerComponent
    , MegaMenuComponent
    , ModalRCIContainerComponent
    , CreateCustomRCIcaseComponent
    , EmailByCategoryComponent
    , FilterPipe
    , HomePageComponent
    , InCorrAutoReplyTrendComponent
    // , ChartDataLabels
    // , ModalContainerComponent
    , ModalRCIContainerComponent
    , ModalRCIPegaComponent
    , ModalWorkItemComponent
    , NbaCaptureResponseComponent
    , NbaOfferComponent
    , NbaTeaserComponent
    , OpenByWorkTypeComponent
    , PegaPieChartComponent
    , PegaVariablesPropertiesComponent
    , PStatComponent
    , RecentInteractionsComponent
    , RecentTreasurerCaseListComponent
    , RciMashupComponent
    , RciCheckResultTableComponent
    , RelAccountListComponent
    , StatusRecentTreasurerComponent
    , TransactionSummaryComponent
    , TransactionSummaryKpiComponent
    , ValueTrendIndicatorArrowComponent
    , WorkitemComponent
    , PWorkItemComponent
    , WelcomeComponent
    , WireRecallMashupComponent
    , Workitem1Component

    , SafeHtml
    , SafeStyle
    , SafeUrl
    // , HeroParentComponent
    // , HeroChildComponent
  ],
  exports: [
    AccountSummaryComponent
   , CaselistComponent
      , CreateCustomRCIcaseComponent
     , EmailByCategoryComponent
      , HomePageComponent
      , InCorrAutoReplyTrendComponent
      // , FileNameDialogComponent
      // , ModalContainerComponent
      , MegaMenuComponent
      // , ModalContainerComponent
      , ModalRCIContainerComponent
      , ModalRCIPegaComponent
      , ModalWorkItemComponent



    // , ChartDataLabels
    , NbaCaptureResponseComponent
    , NbaOfferComponent
    , NbaTeaserComponent
    , OpenByWorkTypeComponent
    , PegaPieChartComponent
    , PegaVariablesPropertiesComponent
    , PStatComponent
    , RecentInteractionsComponent
    , RecentTreasurerCaseListComponent
    , RciCheckResultTableComponent
    , RciMashupComponent
    , RelAccountListComponent
    , StatusRecentTreasurerComponent
    , TransactionSummaryComponent
    , TransactionSummaryKpiComponent
    , WorkitemComponent
    , PWorkItemComponent
    , ValueTrendIndicatorArrowComponent
    , WelcomeComponent

    , WireRecallMashupComponent
    , Workitem1Component
    , ModalWorkItemComponent

    , SafeHtml
    , SafeStyle
    , SafeUrl
    // , HeroParentComponent
    // , HeroChildComponent
  ],
  entryComponents: [
  //  FileNameDialogComponent
  //  , ModalContainerComponent
    ModalRCIContainerComponent
    // , PegaVariablesPropertiesComponent
   , RciMashupComponent
   , ModalRCIPegaComponent
   , CreateCustomRCIcaseComponent
   , WorkitemComponent
   , ModalWorkItemComponent
   , RciCheckResultTableComponent
   , WelcomeComponent
   , WireRecallMashupComponent
  //  , HeroParentComponent
    // , HeroChildComponent
  ]
})
export class SharedPegaModule { }
