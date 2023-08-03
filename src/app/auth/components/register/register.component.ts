import {Component, OnInit} from '@angular/core';
import { AbstractControlOptions, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';
import {User} from '../../../user/data/User';
import {MustMatch} from "../../../shared/must-match.validator";
import {ToastrService} from "ngx-toastr";
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf]
})
export class RegisterComponent implements OnInit {
    user!: User;
    userForm!: UntypedFormGroup;
    usernameCtrl!: UntypedFormControl;
    emailCtrl!: UntypedFormControl;
    passwordCtrl!: UntypedFormControl;
    passwordRepeatCtrl!: UntypedFormControl;
    // captchaCtrl!: FormControl;
    // roleCtrl!: FormControl;

    constructor(
        private authService: AuthService,
        private fb: UntypedFormBuilder,
        public router: Router,
        private toastr: ToastrService,
    ) {
        // redirect to home if already logged in
        if (this.authService.currentUserValue) {
            this.router.navigate(['/']).catch(err => console.error(err));
        } else {
            this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
            this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
            this.passwordCtrl = fb.control('', [Validators.required, Validators.minLength(8)]);
            this.passwordRepeatCtrl = fb.control('', Validators.required);
            // this.captchaCtrl = fb.control('', Validators.required);
            // this.roleCtrl = fb.control('', [Validators.required]);

            this.userForm = fb.group({
                username: this.usernameCtrl,
                email: this.emailCtrl,
                password: this.passwordCtrl,
                passwordRepeat: this.passwordRepeatCtrl,
                // captcha: this.captchaCtrl,
                // role: this.roleCtrl
            }, {
                validator: MustMatch('password', 'passwordRepeat')
            } as AbstractControlOptions);
        }
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        this.authService.register(this.userForm.value).subscribe({
            next: () => {
                this.router.navigateByUrl('').catch(err => console.error(err));
                // Todo à valider
                Swal.fire(`Vous allez recevoir un mail de validation`).then();
            },
            error: (error) => {
                console.error(error);
                if (Array.isArray(error)) {
                    error.map((err: string) => {
                        this.toastr.error(err, 'Error !');
                    })
                } else {
                    this.toastr.error(error, 'Error !');
                }
            }
        });
    }
}
