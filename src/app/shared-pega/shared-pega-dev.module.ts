import { NgModule } from '@angular/core';

import { CasedetailsComponent } from './../layout/pega/casedetails/casedetails.component';
// import { FxLayoutTestComponent } from './../layout/pega/fx-layout-test/fx-layout-test.component';
import { MaintabsComponent } from './../layout/pega/maintabs/maintabs.component';
import { PaginationComponent } from './../layout/pega/ngPaging/pagination.component';
import { WorkListPanelSectionComponent } from './../layout/pega/worklistpanelsection/worklistpanelsection.component';



@NgModule({
  imports: [

  ],
  providers: [
    // CaselistComponent
  ],
  declarations: [
    // FxLayoutTestComponent
     CasedetailsComponent
    , MaintabsComponent
    , PaginationComponent
    , WorkListPanelSectionComponent
  ]
})
export class SharedPegaDevModule { }
