import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatAutocompleteModule
  , MatBadgeModule
  , MatButtonModule
  , MatCardModule
  , MatDatepickerModule
  , MatDialogModule
  , MatIconModule

  , MatInputModule
  , MatFormFieldModule
  , MatMenuModule
  , MatPaginatorModule
  , MatProgressBarModule
  , MatProgressSpinnerModule
  , MatRadioModule
  , MatSelectModule
  , MatSortModule
  , MatTableModule
  , MatToolbarModule
  , MatTooltipModule
} from '@angular/material';
// import { MatTableModule, MatInputModule, MatPaginatorModule, MatSortModule  } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
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
    , MatPaginatorModule
    , MatProgressBarModule
    , MatProgressSpinnerModule
    , MatRadioModule
    , MatSelectModule
    , MatSortModule
    , MatTableModule
    , MatToolbarModule
    , MatTooltipModule

  ],
  exports: [
    MatAutocompleteModule
    , MatBadgeModule
    , MatButtonModule
    , MatCardModule
    , MatDatepickerModule
    , MatDialogModule
    , MatIconModule
    , MatInputModule
    , MatFormFieldModule
    , MatMenuModule
    , MatPaginatorModule
    , MatProgressBarModule
    , MatProgressSpinnerModule
    , MatRadioModule
    , MatSelectModule
    , MatSortModule
    , MatTableModule
    , MatToolbarModule
    , MatTooltipModule
  ],

})
export class AppMaterialModule { }
