import { enableProdMode, LOCALE_ID, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app/app-routing.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './app/auth/auth.module';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UntypedFormBuilder } from '@angular/forms';
import { LoggedInGuardService } from './app/shared/services/logged-in-guard.service';
import { AuthService } from './app/shared/services/auth.service';
import { ErrorInterceptor } from './app/_helpers/error.interceptor';
import { JwtInterceptor } from './app/_helpers/jwt.interceptor';
import { HTTP_INTERCEPTORS, withInterceptorsFromDi, provideHttpClient } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule, ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-bottom-right',
            preventDuplicates: true,
            countDuplicates: true,
            resetTimeoutOnDuplicate: true
        }), 
        // SweetAlert2Module.forRoot(),
        AuthModule, RouterModule, AppRoutingModule, 
        // NgbModule,
        MatButtonModule, MatCardModule, MatIconModule, MatMenuModule, MatChipsModule, MatToolbarModule),
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        AuthService,
        LoggedInGuardService,
        UntypedFormBuilder,
        MatSnackBar,
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(err => console.error(err));
