import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { LayoutComponent } from './layout.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent, NgbdModalComponentNBA, modalRCICaseType, NgbdModalContentNBA } from './pega/modal/modal.component';
// import { NgbPagination } from './pega/index';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgbDatePipe } from './pega/_pipes/ngbDatePipe';
// import { NgbdPaginationCustomization } from './pega/ngPaging/pagination-customization.component';

import { PaginationComponent } from './../layout/bs-component/components';

// import { Mod } from './pega/modal/modal.component';
import { CreateRCIcaseComponent } from './pega/index';
import { SharedPegaDataService } from './pega/_services/sharedpegadata.service';
// import { UnifiedtaskComponent } from './pega/';
// import { DatePickerComponent } from './bs-component/components/index';

@NgModule({
  imports: [
    CommonModule
    , LayoutRoutingModule
    , TranslateModule
    , FormsModule
    , ReactiveFormsModule
    , MDBBootstrapModule.forRoot()
        // , NgbPaginationModule
        , NgbDropdownModule
        , NgxCurrencyModule
        // , NgbdPaginationCustomization
        // CreateRCIcaseComponent.forRoot(,

        , NgbModule.forRoot()
        // , SharedPegaDataService
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
      , NgbDatePipe
      // , PaginationComponent
      // , NgbPagination

      // , NgbdPaginationCustomization
      // , UnifiedtaskComponent
  ],
  providers: [
    SharedPegaDataService
  ],
  entryComponents: [
    modalRCICaseType
    , NgbdModalContentNBA
    //  , NgbdPaginationCustomization
  ],

  exports: [
    // NgbdPaginationCustomization
  ]
  , schemas: [
    NO_ERRORS_SCHEMA
    , CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
