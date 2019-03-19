import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { PWorkItemRoutingModule } from './pworkitem-routing.module';
import { PWorkItemComponent } from './pworkitem.component';
// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';

import {
  UnifiedtasklistComponent
} from './../../../layout/opentask-page/components/unifiedtasklist/unifiedtasklist.component';

import { StatModule } from '../../../shared';
@NgModule({
    imports: [

      CommonModule,

      PWorkItemRoutingModule],
    declarations: [
      PWorkItemComponent,
      UnifiedtasklistComponent
    ]
})
export class PWorkItemModule {}
