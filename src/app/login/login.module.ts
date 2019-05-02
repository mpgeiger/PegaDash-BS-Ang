import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';
// import { AppModule } from './../app.component';
// import { AppModule } from '../app.module';
import { HttpParams } from '@angular/common/http';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    declarations: [LoginComponent],
    imports: [
      FormsModule,
    ReactiveFormsModule,
        CommonModule,
        TranslateModule,
        LoginRoutingModule
        ]
//         , exports: [
//  HttpParams
//     ]
})
export class LoginModule {}
