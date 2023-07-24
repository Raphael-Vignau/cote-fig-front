import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AuthRoutingModule} from './auth-routing.module';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from '@angular/material/legacy-form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatLegacyInputModule as MatInputModule} from '@angular/material/legacy-input';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {RecaptchaFormsModule, RecaptchaModule} from "ng-recaptcha";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {NewPasswordComponent} from './components/new-password/new-password.component';
import {MatToolbarModule} from "@angular/material/toolbar";

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        NewPasswordComponent
    ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        MatSelectModule,
        MatToolbarModule
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule {
}
