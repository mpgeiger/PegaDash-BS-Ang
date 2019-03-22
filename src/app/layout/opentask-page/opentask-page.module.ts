import { NgModule } from '@angular/core';
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

import { StatModule } from '../../shared';
@NgModule({
    imports: [

      CommonModule
      , NgbCarouselModule
      , NgbAlertModule
      , StatModule
      , OpenTaskPageRoutingModule
      // , LayoutModule
  ],
    declarations: [
      OpenTaskPageComponent
      , TimelineComponent
      , NotificationComponent
      , ChatComponent
      , UnifiedtasklistComponent
      , UnifiedtaskComponent
    ]
})
export class OpenTaskPageModule {}
