import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";
import { User } from 'src/app/user/data/User';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    logged = false;

    constructor(
        private _authService: AuthService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        if (this._authService.currentUser) {
            this._authService.currentUser.subscribe((user: User | null) => {
                this.logged = !!user;
                if (this.logged) {
                    this.router.navigateByUrl('dashboard').catch((err: Error) => console.error(err));
                }
            });
        }
    }
}
