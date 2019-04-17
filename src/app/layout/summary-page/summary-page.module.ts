
import { NgModule } from '@angular/core';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { SummaryPageRoutingModule } from './summary-page-routing.module';
import { SummaryPageComponent } from './summary-page.component';
// import { RecentTreasurerCaseListComponent } from '../pega/recentTreasurerCases/recentTreasurerCaseList.component';
// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';
import { FormsModule } from '@angular/forms';
 import { ReactiveFormsModule } from '@angular/forms';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent,
  UnifiedtasklistComponent
} from './components';

import { StatModule } from '../../shared';
// import { LayoutModule } from './../layout.module';
// import { RecentTreasurerCaseListComponent } from '../pega';
//  import { RecentTreasurerCaseListComponent } from '../pega';
import { SharedPegaModule } from './../../shared-pega/shared-pega.module';

@NgModule({
    imports: [
      CommonModule
      , FormsModule
       , ReactiveFormsModule
      //  , LayoutModule
      , AppMaterialModule
      , SharedPegaModule
      , NgbCarouselModule
      , NgbAlertModule
      , StatModule
      , SummaryPageRoutingModule
      // , RecentTreasurerCaseListComponent
    ],
    declarations: [
      SummaryPageComponent
      , TimelineComponent
      , NotificationComponent
      , ChatComponent
      , UnifiedtasklistComponent
      //  , RecentTreasurerCaseListComponent
      // , RecentTreasurerCaseListCompo nent

    ],
    exports: [
      // ReactiveFormsModule
      // RecentTreasurerCaseListComponent
    ]
})
export class SummaryPageModule {}
