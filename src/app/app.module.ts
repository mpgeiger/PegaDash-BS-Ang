import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AppMaterialModule } from './app-material/app-material.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
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
