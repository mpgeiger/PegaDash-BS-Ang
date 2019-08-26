
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedPegaModule } from './../../shared-pega/shared-pega.module';

import { BlankPageRoutingModule } from './blank-page-routing.module';
import { BlankPageComponent } from './blank-page.component';
// import { PWorkItemComponent, WorkListPanelSectionComponent, MaintabsComponent } from '../../layout/pega';
// import { CreateRCIcaseComponent } from './../pega/create-rcicase/create-rcicase.component';

// import { PWorkItemComponent } from '@ss/app/layout/pega/workitem/pworkitem.component';  // ../../layout/pega/workitem/pworkitem.component';
// import { PWorkItemComponent } from '@ss/app/layout/pega/pworkitem/pworkitem.component';
// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';


import {
  TimelineComponent,
  NotificationComponent,
  ChatComponent,
  UnifiedtasklistComponent

} from './components';

import { StatModule } from '../../shared';
// import { PWorkItemComponent } from '../pega';
@NgModule({
    imports: [

      CommonModule,
      NgbCarouselModule,
      NgbAlertModule,
      StatModule,
      BlankPageRoutingModule
      , SharedPegaModule

    ],
    declarations: [
      BlankPageComponent
      , TimelineComponent
      , NotificationComponent
      , ChatComponent
      , UnifiedtasklistComponent

      // WorkListPanelSectionComponent,
      // MaintabsComponent,
      // , PWorkItemComponent
      // , CreateRCIcaseComponent
    ]
})
export class BlankPageModule {}
