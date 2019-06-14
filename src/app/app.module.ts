import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { AuthGuard } from './shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// MPG Angular added /dashboard for TOMCAT and base-href
import {APP_BASE_HREF} from '@angular/common';
import { PegaVariablesPropertiesComponent } from '@ss/app/shared-pega/pega-variables-properties.component';


// import { HomeAccountsPageModule } from './layout/pega/home-accounts-page/home-accounts-page.module';
// import { HomePageModule } from './layout/pega/home-page/home-page.module';

// import { SharedPegaModule } from './shared-pega/shared-pega.module';

@NgModule({
    imports: [
      BrowserModule,
      FormsModule,
    ReactiveFormsModule,
      CommonModule,
      AppMaterialModule,
      BrowserAnimationsModule,
      HttpClientModule,
      LanguageTranslationModule,
      AppRoutingModule
      // HomePageModule,
      // SharedPegaModule
    ],
    declarations: [
      AppComponent,
      PegaVariablesPropertiesComponent
    ],
    exports: [
      AppMaterialModule,
      PegaVariablesPropertiesComponent
      // FormControl
      // ReactiveFormsModule
      // HttpClientModule,
      // HttpParams
    ],
    providers: [
      AuthGuard
      , PegaVariablesPropertiesComponent
      // MPG Angular added /dashboard for TOMCAT and base-href
    , {provide: APP_BASE_HREF, useValue: '/dashboard'}],
    bootstrap: [AppComponent]
})
export class AppModule {}
