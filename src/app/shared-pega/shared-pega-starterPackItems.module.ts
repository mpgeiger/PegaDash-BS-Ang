
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule  } from '../app-material/app-material.module';

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


@NgModule({
  imports: [
    CommonModule
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

  ],
  exports: [

    // BreadcrumbComponent
    // , CreatecaselistComponent
    // , FieldComponent
    // , GroupComponent
    // , ToppageComponent
    // , TopviewComponent
  ],
  providers: []
  })
export class SharedPegaStarterPackModule {}
