// import { UnifiedtaskComponent } from './../../../.history/src/app/layout/pega/unifiedtask/unifiedtask.component_20190322131428';
// import { UnifiedtaskComponent } from './pega/unifiedtask/unifiedtask.component';
// import { DatePickerComponent } from './bs-component/components/date-picker/date-picker.component';
// import { ModalComponent } from './pega/modal/modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent, NgbdModalContent } from './pega/modal/modal.component';

// import { Mod } from './pega/modal/modal.component';
import { CreateRCIcaseComponent } from './pega/create-rcicase/create-rcicase.component';
// import { UnifiedtaskComponent } from './pega/';
// import { DatePickerComponent } from './bs-component/components/index';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        TranslateModule,
        NgbDropdownModule,
        // CreateRCIcaseComponent.forRoot(,
        NgbModule.forRoot()
    ],
    declarations: [
      LayoutComponent
      , SidebarComponent
      , HeaderComponent
      , NgbdModalComponent
      , CreateRCIcaseComponent
      // , DatePickerComponent
      , NgbdModalContent
    // , UnifiedtaskComponent
  ],
    entryComponents: [
      NgbdModalContent
         ],

    exports: []
})
export class LayoutModule {}
