import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent
} from './components';

import { StatModule } from '../../shared';
@NgModule({
    imports: [

      CommonModule,
      NgbCarouselModule,
      NgbAlertModule,
      StatModule,
      BlankPageRoutingModule],
    declarations: [
      BlankPageComponent,
      TimelineComponent,
      NotificationComponent,
      ChatComponent
    ]
})
export class BlankPageModule {}
