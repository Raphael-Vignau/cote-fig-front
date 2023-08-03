import {Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import {User} from "../data/User";
import {UserService} from "../services/user.service";
import {Role} from "../data/Role";
import { UserFormComponent } from '../user-form/user-form.component';
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatLegacyButtonModule, RouterLink, MatIconModule, NgIf, UserFormComponent]
})
export class UserEditComponent implements OnInit {
    user!: User;
    Role = Role;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.getOneUser(this.route.snapshot.paramMap.get('idUser'))
    }

    getOneUser(idUser: string | null): void {
        if (idUser) {
            this.userService.getOneUser(idUser).subscribe({
                next: (user: User) => {
                    this.user = user;
                },
                error: error => {
                    console.error(error);
                    this.router.navigate(['/not-found']).then();
                }
            });
        }
    }
}
