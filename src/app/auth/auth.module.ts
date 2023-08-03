import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RecaptchaFormsModule, RecaptchaModule } from "ng-recaptcha";
import { MatSelectModule } from "@angular/material/select";
import { NewPasswordComponent } from './components/new-password/new-password.component';
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
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
        MatToolbarModule,
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent,
        NewPasswordComponent
    ],
    exports: [
        LoginComponent,
        RegisterComponent,
        ResetPasswordComponent
    ]
})
export class AuthModule {
}
