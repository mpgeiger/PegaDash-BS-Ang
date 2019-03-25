
import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent, NgbdModalComponentNBA, modalRCICaseType, NgbdModalContentNBA } from './pega/modal/modal.component';
// import { NgbdPaginationCustomization } from './pega/ngPaging/pagination-customization';

import { PaginationComponent } from './../layout/bs-component/components';

// import { Mod } from './pega/modal/modal.component';
import { CreateRCIcaseComponent, NgbdPaginationCustomization } from './pega/index';
// import { UnifiedtaskComponent } from './pega/';
// import { DatePickerComponent } from './bs-component/components/index';

@NgModule({
    imports: [
          CommonModule
        , LayoutRoutingModule
        , TranslateModule
        //  , NgbPagination
        , NgbDropdownModule
        // , NgbdPaginationCustomization
        // CreateRCIcaseComponent.forRoot(,
        , NgbModule.forRoot()
    ],
    declarations: [
        LayoutComponent
      , SidebarComponent
      , HeaderComponent
      , NgbdModalComponent
      , NgbdModalComponentNBA
      , CreateRCIcaseComponent
      // , DatePickerComponent
      , modalRCICaseType
      , NgbdModalContentNBA
      // , PaginationComponent
      // , NgbPagination

      , NgbdPaginationCustomization
      // , UnifiedtaskComponent
  ],
    entryComponents: [
      modalRCICaseType
      , NgbdModalContentNBA
      // , NgbdPaginationCustomization
         ],

    exports: [NgbdPaginationCustomization]
})
export class LayoutModule {}
