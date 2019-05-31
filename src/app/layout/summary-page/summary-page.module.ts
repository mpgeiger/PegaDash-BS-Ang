// import { ModalContainerComponent } from './../pega/modal-container/modal-container.component';
// import { AppMaterialModule } from './../../../../.history/src/app/app-material/app-material.module_20190420132206';
// import { AppMaterialModule } from './../../app-material/app-material.module';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './../../app-material/app-material.module';
import { SummaryPageRoutingModule } from './summary-page-routing.module';
import { SummaryPageComponent } from './summary-page.component';
// import { RecentTreasurerCaseListComponent } from '../pega/recentTreasurerCases/recentTreasurerCaseList.component';
// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';
//  import { ReactiveFormsModule } from '@angular/forms';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent,
  UnifiedtasklistComponent
} from './components';

// import { StatModule } from '../../shared';
// import { StatComponent } from './../../shared/modules/stat/stat.component';
// import { LayoutModule } from './../layout.module';
// import { RecentTreasurerCaseListComponent } from '../pega';
//  import { RecentTreasurerCaseListComponent } from '../pega';
import { SharedPegaModule } from './../../shared-pega/shared-pega.module';
// import { PegaVariablesPropertiesComponent } from './../../shared-pega/pega-variables-properties/pega-variables-properties.component';


// import { FileNameDialogComponent } from '../pega';
// import { AppMaterialModule } from './../../app-material/app-material.module';

@NgModule({
    imports: [
      CommonModule
      , FormsModule
     , ReactiveFormsModule
      // , FormsModule
      //  , ReactiveFormsModule
      //  , LayoutModule
       , AppMaterialModule
      , SharedPegaModule
      , NgbCarouselModule
      , NgbAlertModule
      // , StatModule
      , SummaryPageRoutingModule
      // , RecentTreasurerCaseListComponent
    ],
    declarations: [
      SummaryPageComponent
      // , PegaVariablesPropertiesComponent
      //  , ModalContainerComponent
      //  , FileNameDialogComponent
      // , StatComponent
      , TimelineComponent
      , NotificationComponent
      , ChatComponent
      , UnifiedtasklistComponent

      //  , RecentTreasurerCaseListComponent
      // , RecentTreasurerCaseListCompo nent

    ],
    exports: [
      FormsModule
      // , PegaVariablesPropertiesComponent
     , ReactiveFormsModule
    //  , StatModule
    //  , StatComponent
      // ModalContainerComponent,
      // FileNameDialogComponent
      // ReactiveFormsModule
      // RecentTreasurerCaseListComponent
    ]
})
export class SummaryPageModule {}
