import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { OpenTaskPageRoutingModule } from './opentask-page-routing.module';
import { OpenTaskPageComponent } from './opentask-page.component';
// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';

import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent,
  UnifiedtasklistComponent
} from './components';

import { StatModule } from '../../shared';
@NgModule({
    imports: [

      CommonModule,
      NgbCarouselModule,
      NgbAlertModule,
      StatModule,
      OpenTaskPageRoutingModule],
    declarations: [
      OpenTaskPageComponent,
      TimelineComponent,
      NotificationComponent,
      ChatComponent,
      UnifiedtasklistComponent
    ]
})
export class OpenTaskPageModule {}
