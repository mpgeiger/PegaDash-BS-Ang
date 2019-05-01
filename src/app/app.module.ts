import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './app-material/app-material.module';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AuthGuard } from './shared';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
        AppRoutingModule,
        // SharedPegaModule
    ],
    declarations: [AppComponent],
    exports: [
      // ReactiveFormsModule
      // HttpClientModule,
      // HttpParams
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
