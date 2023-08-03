import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Role } from "../../../user/data/Role";
import { User } from 'app/user/data/User';
import { ToastrService } from "ngx-toastr";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: true,
    imports: [MatToolbarModule, RouterLink, NgIf, MatButtonModule, MatIconModule, MatMenuModule]
})
export class HeaderComponent implements OnInit {
    logged = false;
    roleAdmin: boolean = false;
    idCurrentUser: string | undefined;

    constructor(
        private _authService: AuthService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        if (this._authService.currentUser) {
            this._authService.currentUser.subscribe((user: User | null) => {
                this.logged = !!user;
                this.roleAdmin = user?.role === Role.ADMIN;
                this.idCurrentUser = user?.sub;
            });
        }
    }

    logout(): void {
        this._authService.logout();
        this.router.navigateByUrl('').then();
        this.toastr.success('Vous êtes déconnecté', 'Déconnection');
    }
}
