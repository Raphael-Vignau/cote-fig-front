import {Component, OnInit} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {AuthService} from "../../../shared/services/auth.service";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf]
})
export class ResetPasswordComponent implements OnInit {
    userForm!: UntypedFormGroup;
    emailCtrl!: UntypedFormControl;

    constructor(
        private fb: UntypedFormBuilder,
        private authService: AuthService,
        private toastr: ToastrService,
        public router: Router
    ) {
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.userForm = fb.group({
            email: this.emailCtrl
        });
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        if (this.userForm.valid) {
            Swal.fire({
                title: `Récupération du mots de passe`,
                icon: 'info',
                text: 'Si ce mail est enregistré, vous allez recevoir un mail !',
                showConfirmButton: true
            }).then();
            this.authService.reset(this.userForm.value.email).subscribe({
                next: () => {
                    this.toastr.info('Vous allez recevoir un mail !', 'Information');
                },
                error: (err: HttpErrorResponse) => {
                    console.error(err);
                    this.toastr.error('Ça n\'a pas fonctionné !', 'Erreur');
                }
            });
        }
    }
}
