

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppMaterialModule  } from '../app-material/app-material.module';
import * as moment from 'moment';

// import { BreadcrumbComponent } from 'src/app/_subcomponents/breadcrumb/breadcrumb.component';
// import { CreatecaselistComponent } from '../subcomponents/createcaselist/createcaselist.component';
import {
  BreadcrumbComponent
, CaptionComponent
, CreatecaselistComponent
, FieldComponent
, GroupComponent
, LayoutComponent
, PageComponent
, ParagraphComponent
, RecentlistComponent
, RepeatinggridComponent
, RepeatinglayoutComponent
, ToppageComponent
, TopviewComponent
, ViewComponent
 } from 'src/app/_subcomponents';

import {
  AutocompleteComponent
  , ButtonComponent
  , CheckboxComponent
  , DateComponent
  , DropdownComponent
  , EmailComponent
  , IconComponent
  , LinkComponent
  , NosupportComponent
  , NumberComponent
  , RadioComponent
  , TextareaComponent
  , TextComponent
  , TextinputComponent
  , UnitdaysComponent
} from 'src/app/_fieldcomponents';

import {
  SafeHtmlPipe
} from 'src/app/_pipe/safehtml.pipe';


@NgModule({
  imports: [
    CommonModule
    , FormsModule
    , ReactiveFormsModule
    , AppMaterialModule
    // BreadcrumbComponent
  ],
  declarations: [
    BreadcrumbComponent
    , CaptionComponent
    , CreatecaselistComponent
    , FieldComponent
    , GroupComponent
    , LayoutComponent
    , PageComponent
    , ParagraphComponent
    , RecentlistComponent
    , RepeatinggridComponent
    , RepeatinglayoutComponent
    , ToppageComponent
    , TopviewComponent
    , ViewComponent


    , AutocompleteComponent
    , ButtonComponent
    , CheckboxComponent
    , DateComponent
    , DropdownComponent
    , EmailComponent
    , IconComponent
    , LinkComponent
    , NosupportComponent
    , NumberComponent
    , RadioComponent
    , TextareaComponent
    , TextComponent
    , TextinputComponent
    , UnitdaysComponent

    , SafeHtmlPipe

  ],
  exports: [

    BreadcrumbComponent
    , CaptionComponent
    , CreatecaselistComponent
    , FieldComponent
    , GroupComponent
    , LayoutComponent
    , PageComponent
    , ParagraphComponent
    , RecentlistComponent
    , RepeatinggridComponent
    , RepeatinglayoutComponent
    , ToppageComponent
    , TopviewComponent
    , ViewComponent
    // , CreatecaselistComponent
    // , FieldComponent
    // , GroupComponent
    // , ToppageComponent
    // , TopviewComponent
  ],
  providers: []
  })
export class SharedPegaStarterPackModule {}
