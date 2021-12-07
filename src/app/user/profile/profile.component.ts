import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../services/user.service";
import {User} from "../data/User";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    user!: User;

    constructor(
        public router: Router,
        public route: ActivatedRoute,
        private userService: UserService
    ) {
    }

    ngOnInit(): void {
        this.getMe()
    }

    getMe(): void {
        this.userService.getMe().subscribe({
            next: (user: User) => {
                this.user = user;
            },
            error: error => {
                console.error(error);
                this.router.navigate(['/not-found']).then();
            }
        })
    }
}
