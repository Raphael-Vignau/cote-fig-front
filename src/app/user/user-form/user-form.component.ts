import {Component, Input, OnInit} from '@angular/core';
import {User} from "../data/User";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {Role} from "../data/Role";
import {ToastrService} from "ngx-toastr";
import Swal from "sweetalert2";
import {AuthService} from "../../shared/services/auth.service";

@Component({
    selector: 'app-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
    @Input() user!: User | null;
    @Input() profile!: boolean;
    userForm: FormGroup;
    roles = Object.values(Role);
    isAdmin = false;

    usernameCtrl: FormControl;
    companyCtrl!: FormControl;
    telCtrl!: FormControl;
    emailCtrl: FormControl;
    roleCtrl: FormControl;
    resellerCtrl: FormControl;
    producerCtrl: FormControl;
    collecte_pointCtrl: FormControl;
    addressCtrl!: FormControl;
    address_detailsCtrl!: FormControl;
    postal_codeCtrl!: FormControl;
    cityCtrl!: FormControl;
    delivery_addressCtrl: FormControl;
    delivery_address_detailsCtrl: FormControl;
    delivery_postal_codeCtrl: FormControl;
    delivery_cityCtrl: FormControl;
    delivery_dataCtrl: FormControl;
    delivery_schedulesCtrl: FormControl;
    heavy_truckCtrl: FormControl;
    stackerCtrl: FormControl;
    forkliftCtrl: FormControl;
    pallet_truckCtrl: FormControl;
    internal_dataCtrl: FormControl;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private authService: AuthService,
        private toastr: ToastrService,
        public router: Router,
        public route: ActivatedRoute
    ) {
        this.usernameCtrl = fb.control('', [Validators.required, Validators.minLength(3)]);
        this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
        this.companyCtrl = fb.control('');
        this.telCtrl = fb.control('');
        this.resellerCtrl = fb.control(false);
        this.producerCtrl = fb.control(false);
        this.collecte_pointCtrl = fb.control(false);
        this.roleCtrl = fb.control('user', [Validators.required]);

        this.addressCtrl = fb.control('');
        this.address_detailsCtrl = fb.control('');
        this.postal_codeCtrl = fb.control('');
        this.cityCtrl = fb.control('');

        this.delivery_addressCtrl = fb.control('');
        this.delivery_address_detailsCtrl = fb.control('');
        this.delivery_postal_codeCtrl = fb.control('');
        this.delivery_cityCtrl = fb.control('');

        this.delivery_dataCtrl = fb.control('');
        this.delivery_schedulesCtrl = fb.control('');
        this.heavy_truckCtrl = fb.control(false);
        this.stackerCtrl = fb.control(false);
        this.forkliftCtrl = fb.control(false);
        this.pallet_truckCtrl = fb.control(false);

        this.internal_dataCtrl = fb.control('');

        this.userForm = fb.group({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            company: this.companyCtrl,
            tel: this.telCtrl,
            role: this.roleCtrl,
        });
    }

    ngOnInit(): void {
        this.setFormValue()
    }

    setFormValue() {
        if (this.user) {
            this.isAdmin = this.user.role === Role.ADMIN;
            this.userForm.setValue({
                username: this.user.username,
                email: this.user.email,
                company: this.user.company,
                tel: this.user.tel,
                role: this.user.role
            })
        }
    }

    onChangeRole(event: any) {
        if (event.value === Role.ADMIN) {
            Swal.fire({
                title: `Changement de rôle`,
                icon: 'warning',
                text: 'Êtes-vous sûr de vouloir donner des droits administrateur à cet utilisateur ?',
                showConfirmButton: true,
                confirmButtonText: 'Changer',
                showCancelButton: true,
                cancelButtonText: 'Annuler'
            }).then(
                (result) => {
                    if (!result.isConfirmed) {
                        this.roleCtrl.setValue(this.user ? this.user.role : Role.USER)
                    }
                }
            )
        }
    }

    onSubmit(): void {
        if (this.profile && this.user) {
            this.userService.editMe(this.userForm.value).subscribe({
                next: () => {
                    this.toastr.success('Votre profil a été Modifié', 'Modifier');
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else if (this.user) {
            this.userService.editUser(this.user.id, this.userForm.value).subscribe({
                next: () => {
                    this.toastr.success('L\'utilisateur a été Modifié', 'Modifier');
                    this.router.navigateByUrl('/user').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        } else {
            this.userService.addUser(this.userForm.value).subscribe({
                next: () => {
                    this.toastr.success('L\'utilisateur a été ajouté', 'Ajouter');
                    this.router.navigateByUrl('/user').catch(err => console.error(err));
                },
                error: (err) => {
                    this.errorSubmit(err)
                }
            })
        }
    }

    errorSubmit(error: string[] | string) {
        console.error(error);
        if (Array.isArray(error)) {
            error.map((err: string) => {
                this.toastr.error(err, 'Error !');
            })
        } else {
            this.toastr.error(error, 'Error !');
        }
    }
}
