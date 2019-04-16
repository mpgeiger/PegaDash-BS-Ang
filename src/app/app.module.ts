import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClientJsonpModule  } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
// import { SharedPegaModule } from './shared-pega/shared-pega.module';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        LanguageTranslationModule,
        AppRoutingModule,
        // SharedPegaModule
    ],
    declarations: [AppComponent],
    exports: [
      // HttpClientModule,
      // HttpParams
    ],
    providers: [AuthGuard],
    bootstrap: [AppComponent]
})
export class AppModule {}
