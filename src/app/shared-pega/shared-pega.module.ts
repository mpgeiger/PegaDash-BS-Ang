import { NbaTeaserComponent } from './../layout/pega/nba-teaser/nba-teaser.component';
// import { ModalComponent } from './../layout/bs-component/components/modal/modal.component';
// import { OpenAssignmentService } from './../_messages/openassignment.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule as Ng2Charts } from 'ng2-charts';

// import { ChartDataLabels } from 'chartjs-plugin-datalabels';

import { AppMaterialModule } from '../app-material/app-material.module';
import { CaselistComponent
  // , FileNameDialogComponent
  // , ModalContainerComponent
  , ModalRCIContainerComponent
  , CreateCustomRCIcaseComponent
  , NbaOfferComponent
  , OpenByWorkTypeComponent
  , PegaPieChartComponent
  , RecentTreasurerCaseListComponent
  , TransactionSummaryComponent
  // , HeroChildComponent
} from '../layout/pega';

// import { HeroParentComponent } from '../layout/components/header/header.component';
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
    // , FileNameDialogComponent
    // , ModalContainerComponent
    , ModalRCIContainerComponent
    , CreateCustomRCIcaseComponent
    // , ChartDataLabels
    , NbaOfferComponent
    , NbaTeaserComponent
    , OpenByWorkTypeComponent
    , PegaPieChartComponent
    , RecentTreasurerCaseListComponent
    , TransactionSummaryComponent
    // , HeroParentComponent
    // , HeroChildComponent
  ],
  exports: [
      CaselistComponent
      // , FileNameDialogComponent
      // , ModalContainerComponent
      , ModalRCIContainerComponent
      , CreateCustomRCIcaseComponent
    // , ChartDataLabels
    , NbaOfferComponent
    , NbaTeaserComponent
    , OpenByWorkTypeComponent
    , PegaPieChartComponent
    , RecentTreasurerCaseListComponent
    , TransactionSummaryComponent
    // , HeroParentComponent
    // , HeroChildComponent
  ],
  entryComponents: [
  //  FileNameDialogComponent
  //  , ModalContainerComponent
    ModalRCIContainerComponent
   , CreateCustomRCIcaseComponent
  //  , HeroParentComponent
    // , HeroChildComponent
  ]
})
export class SharedPegaModule { }
