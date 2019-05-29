
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
// import { PWorkItemComponent, WorkListPanelSectionComponent, MaintabsComponent } from '../../layout/pega';
// import { CreateRCIcaseComponent } from './../pega/create-rcicase/create-rcicase.component';

// import { PWorkItemComponent } from '../../layout/pega/workitem/pworkitem.component';
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
      BlankPageRoutingModule

    ],
    declarations: [
      BlankPageComponent,
      TimelineComponent,
      NotificationComponent,
      ChatComponent,
      UnifiedtasklistComponent
      // WorkListPanelSectionComponent,
      // MaintabsComponent,
      // PWorkItemComponent
      // , CreateRCIcaseComponent
    ]
})
export class BlankPageModule {}
