import { Component, OnInit } from '@angular/core';
import { User } from "../../user/data/User";
import { Role } from "../../user/data/Role";
import { AuthService } from "../../shared/services/auth.service";
import { UserService } from "../../user/services/user.service";
import { Router, RouterLink } from "@angular/router";
import { NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, NgIf]
})
export class DashboardComponent implements OnInit {
    user!: User;
    readonly Role = Role;

    constructor(
        private _authService: AuthService,
        private userService: UserService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.getMe()
    }

    getMe(): void {
        if (this._authService.currentUser && this._authService.currentUserValue) {
            this.userService.getMe().subscribe({
                next: (user: User) => {
                    this.user = user;
                },
                error: error => {
                    console.error(error);
                }
            })
        }
    }

}
