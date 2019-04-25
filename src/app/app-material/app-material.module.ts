import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
import {
  MatExpansionModule
  , MatAutocompleteModule
  , MatBadgeModule
  , MatButtonModule
  , MatCardModule
  , MatDatepickerModule
  , MatDialogModule
  , MatIconModule

  , MatInputModule
  , MatFormFieldModule
  , MatMenuModule

  , MatNativeDateModule
  , MatPaginatorModule
  , MatProgressBarModule
  , MatProgressSpinnerModule
  , MatRadioModule
  , MatSelectModule
  , MatSortModule
  , MatTableModule
  , MatToolbarModule
  , MatTooltipModule,
  MatAccordion
} from '@angular/material';
// import { MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule  } from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
@NgModule({
  declarations: [],
  imports: [
CommonModule,
      MatExpansionModule
    , MatAutocompleteModule
    , MatBadgeModule
    , MatButtonModule
    , MatCardModule
    , MatDatepickerModule
    , MatDialogModule
    , MatIconModule
    , MatInputModule
    , MatFormFieldModule
    , MatMenuModule
    , MatNativeDateModule
    , MatPaginatorModule
    , MatProgressBarModule
    , MatProgressSpinnerModule
    , MatRadioModule
    , MatSelectModule
    , MatSortModule
    , MatTableModule
    , MatToolbarModule
    , MatTooltipModule
    , MatMomentDateModule

  ],
  exports: [
    MatExpansionModule
    , MatAutocompleteModule
    , MatBadgeModule
    , MatButtonModule
    , MatCardModule
    , MatDatepickerModule
    , MatDialogModule
    , MatIconModule
    , MatInputModule
    , MatFormFieldModule
    , MatMenuModule
    , MatNativeDateModule
    , MatPaginatorModule
    , MatProgressBarModule
    , MatProgressSpinnerModule
    , MatRadioModule
    , MatSelectModule
    , MatSortModule
    , MatTableModule
    , MatToolbarModule
    , MatTooltipModule
    , MatMomentDateModule
  ],
  providers: [
    MatExpansionModule
    , MatDatepickerModule
    , MatBadgeModule
    , MatCardModule

    , MatTooltipModule
   ]

})
export class AppMaterialModule { }
