import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../user/services/user.service";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-list-button',
    templateUrl: './add-list-button.component.html',
    styleUrls: ['./add-list-button.component.css']
})
export class AddListButtonComponent implements OnInit {
    @Input() idFigurine!: string;
    @Input() nbrUserAlready: number = 0;
    @Input() collection: boolean = false;
    @Input() wishlist: boolean = false;
    logged: boolean = false;
    textButton: string = '';
    iconButton: string = '';

    constructor(
        private _authService: AuthService,
        private userService: UserService,
        private toastr: ToastrService,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.logged = !!this._authService.currentUserValue
        if (this.collection) {
            this.textButton = 'Je l\'ai';
            this.iconButton = 'playlist_add_check';

        } else if (this.wishlist) {
            this.textButton = 'Je la cherche';
            this.iconButton = 'favorite'
        }
    }

    onAddList(idFigurine: string): void {
        if (this.logged) {
            if (this.collection) {
                this.userService.addToCollection(idFigurine).subscribe(
                    () => {
                        this.toastr.success('Figurine ajoutée à votre collection', 'Ajouter')
                        this.nbrUserAlready ++
                    },
                    error => {
                        this.toastr.error(error, 'Erreur');
                        console.error(error)
                    }
                )

            } else if (this.wishlist) {
                this.userService.addToWishlist(idFigurine).subscribe(
                    () => {
                        this.toastr.success('Figurine ajoutée à votre Wishlist', 'Ajouter')
                        this.nbrUserAlready ++
                    },
                    error => {
                        this.toastr.error(error, 'Erreur');
                        console.error(error)
                    }
                )
            }
        } else {
            this.router.navigate(['login'])
        }
    }

}
