import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    userForm!: UntypedFormGroup;
    emailCtrl!: UntypedFormControl;
    passwordCtrl!: UntypedFormControl;

    constructor(
        private authService: AuthService,
        private fb: UntypedFormBuilder,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.passwordCtrl = fb.control('', Validators.required);

        this.userForm = fb.group({
            email: this.emailCtrl,
            password: this.passwordCtrl
        });
    }

    ngOnInit(): void {
        const token = this.route.snapshot.queryParams.token
        if (token) {
            this.confirm(token)
        }
    }

    onSubmit(): void {
        this.authService.login(this.userForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl('dashboard').catch(err => console.error(err));
                this.toastr.success('Vous êtes connecté', 'Connection');
            },
            error: error => {
                console.error(error);
                this.toastr.error(error, 'Error');
            }
        });
    }

    confirm(token: string): void {
        this.authService.confirm(token).subscribe({
            next: () => {
                this.router.navigateByUrl('').catch(err => console.error(err));
                this.toastr.success('Votre email est confirmé', 'Confirmation');
                this.toastr.success('Vous êtes connecté', 'Connection');
            },
            error: error => {
                console.error(error);
                this.toastr.error('Erreur de confirmation de l\'email', 'Confirmation');
            }
        });
    }
}
