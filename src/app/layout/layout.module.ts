import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent, NgbdModalComponentNBA, modalRCICaseType, NgbdModalContentNBA } from './pega/modal/modal.component';
// import { NgbPagination } from './pega/index';
import { NgxCurrencyModule } from 'ngx-currency';
import { NgbDatePipe } from './pega/_pipes/ngbDatePipe';
import { MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule  } from '@angular/material';
// import { FlexLayoutModule } from '@angular/fle';

// import { NgbdPaginationCustomization } from './pega/ngPaging/pagination-customization.component';

import { PaginationComponent } from './../layout/bs-component/components';

// import { Mod } from './pega/modal/modal.component';
import { CreateRCIcaseComponent, CaselistComponent, RecentTreasurerCaseListComponent } from './pega/index';
import { SharedPegaDataService } from './pega/_services/sharedpegadata.service';
// import { CaselistComponent } from './pega/caselist/caselist.component';
// import { UnifiedtaskComponent } from './pega/';
// import { DatePickerComponent } from './bs-component/components/index';

@NgModule({
    imports: [
          CommonModule
          // , FlexLayoutModule
        , LayoutRoutingModule
        , MatTableModule
        , MatInputModule
        , MatPaginatorModule
        , MatSortModule
        , TranslateModule
        , FormsModule
        , ReactiveFormsModule
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
      , CaselistComponent
      , RecentTreasurerCaseListComponent
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
    , CaselistComponent
    , RecentTreasurerCaseListComponent
    //  , NgbdPaginationCustomization
  ],

  exports: [
    // NgbdPaginationCustomization
    CaselistComponent
  , RecentTreasurerCaseListComponent
  , MatTableModule
  , MatPaginatorModule
  , MatInputModule
  , MatSortModule
]
  , schemas: [
    NO_ERRORS_SCHEMA
    , CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
