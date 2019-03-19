import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { SummaryPageRoutingModule } from './summary-page-routing.module';
import { SummaryPageComponent } from './summary-page.component';
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
      SummaryPageRoutingModule],
    declarations: [
      SummaryPageComponent,
      TimelineComponent,
      NotificationComponent,
      ChatComponent,
      UnifiedtasklistComponent
    ]
})
export class SummaryPageModule {}
