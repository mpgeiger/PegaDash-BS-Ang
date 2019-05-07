import { GroupByPipe } from 'ngx-pipes';

import { LayoutComponent } from '../../layout.component';
// import { GroupComponent } from './../../../_subcomponents/group/group.component';
// import { FieldComponent } from './../../../_subcomponents/field/field.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CasedetailsComponent} from '../casedetails/casedetails.component';
// import { NgbCarouselModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
// import { PWorkItemRoutingModule } from './pworkitem-routing.module';
// import { PWorkItemComponent } from './pworkitem.component';
// import { UnifiedtasklistComponent } from '../../shared/pegaComponents/unifiedtasklist/unifiedtasklist.component';
// import {FieldComponent, GroupComponent, TopviewComponent, PageComponent} from '../../../_subcomponents/index';
// import {
  // UnifiedtasklistComponent
// } from './../../../layout/opentask-page/components/unifiedtasklist/unifiedtasklist.component';

// import { StatModule } from '../../../shared';
 import { FieldComponent, GroupComponent, CaptionComponent, CreatecaselistComponent, PageComponent, TopviewComponent } from 'src/app/_subcomponents';
@NgModule({
    imports: [
      FieldComponent,
      GroupComponent,
      LayoutComponent,
      CommonModule,
      TopviewComponent,
      CasedetailsComponent
],
    declarations: [

      FieldComponent,
      GroupComponent,
      LayoutComponent,
      TopviewComponent,
      CasedetailsComponent
    ]
})
export class PWorkItemModule {}
