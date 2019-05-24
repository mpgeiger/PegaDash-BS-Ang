
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdModalComponent, NgbdModalComponentNBA, modalRCICaseType, NgbdModalContentNBA } from './pega/modal/modal.component';

import { NgxCurrencyModule } from 'ngx-currency';
import { NgbDatePipe } from './pega/_pipes/ngbDatePipe';

// import { Mod } from './pega/modal/modal.component';
import { CreateRCIcaseComponent, CaselistComponent, RecentTreasurerCaseListComponent } from './pega/index';
import { SharedPegaDataService } from './pega/_services/sharedpegadata.service';
import { OpenTaskPageModule } from './opentask-page/opentask-page.module';
// import { OpenTaskPageComponent } from './opentask-page/opentask-page.component';
import { SharedPegaModule } from '../shared-pega/shared-pega.module';

import { AppMaterialModule  } from '../app-material/app-material.module';
import { FromCamelCase } from './pega/_pipes/fromCamelCase';


@NgModule({
    imports: [
          CommonModule
          , FormsModule
        , ReactiveFormsModule
        , FlexLayoutModule
        , LayoutRoutingModule
        // , MatTableModule
        // , MatInputModule
        // , MatPaginatorModule
        // , MatSortModule
        , TranslateModule
        // , NgbPaginationModule
        , NgbDropdownModule
        , NgxCurrencyModule
        // , NgbdPaginationCustomization
        // CreateRCIcaseComponent.forRoot(,
        // , NgbModule.forRoot()
        , NgbModule
        , OpenTaskPageModule
        , SharedPegaModule
        , AppMaterialModule
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
      , FromCamelCase
      // , OpenTaskPageComponent
      // , RecentTreasurerCaseListComponent
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

  ],

  exports: [
    // NgbdPaginationCustomization
  // CaselistComponent
  // , RecentTreasurerCaseListComponent
  // , OpenTaskPageComponent
  FormsModule
  , ReactiveFormsModule
  , OpenTaskPageModule
  //  ReactiveFormsModule
]
  , schemas: [
    NO_ERRORS_SCHEMA
    , CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule {}
