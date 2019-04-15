// import { SharedPegaModule } from './../../../../.history/src/app/shared-pega/shared-pega.module_20190415090848';
// import { SharedPegaModule } from './../../../../.history/src/app/shared-pega/shared-pega.module_20190415090219';
// import { LayoutModule } from '../layout.module';
// import { CaselistComponent } from './../pega/caselist/caselist.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { LayoutModule } from './../../../../.history/src/app/layout/layout.module_20190328105706';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { LayoutModule } from '../layout.module';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// import { LayoutComponent } from '..';

import { OpenTaskPageRoutingModule } from './opentask-page-routing.module';
import { OpenTaskPageComponent } from './opentask-page.component';

// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';

import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent,
  UnifiedtasklistComponent
} from './components';
import { UnifiedtaskComponent } from './../pega/unifiedtask/unifiedtask.component';
import { SharedPegaModule } from './../../shared-pega/shared-pega.module';

import { StatModule } from '../../shared';
// import { SharedPegaModule } './SharedPegaModule'
// import { CaselistComponent } from '../pega/';
@NgModule({
    imports: [

      // LayoutModule
       CommonModule
       , SharedPegaModule
      , NgbModule
      , NgbCarouselModule
      , NgbAlertModule
      , StatModule
      , OpenTaskPageRoutingModule
      // , NgbdPaginationCustomization
      // , NgbPagination
      // , LayoutModule
  ],
    declarations: [
      OpenTaskPageComponent
      , TimelineComponent
      , NotificationComponent
      , ChatComponent
      , UnifiedtasklistComponent
      // , CaselistComponent
      , UnifiedtaskComponent
    ]
})
export class OpenTaskPageModule {}
