import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FigurineService} from "../../../figurine/services/figurine.service";
import {Figurine} from "../../../figurine/data/Figurine";
import {environment} from "../../../../environments/environment";
import {NgxMasonryComponent, NgxMasonryOptions} from "ngx-masonry";
import {UserService} from "../../../user/services/user.service";
import {ToastrService} from "ngx-toastr";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    @Input() collection: boolean = false;
    @Input() wishlist: boolean = false;
    figurines: Figurine[] = [];
    authUrl = environment.api_base_url;
    nbrFigurinesTotal: number = 20
    public masonryOptions: NgxMasonryOptions = {
        columnWidth: '.masonry-item',
        itemSelector: '.masonry-item',
        fitWidth: true,
        gutter: 10,
        resize: true,
        initLayout: true,
        horizontalOrder: true
    };

    @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

    constructor(
        private figurineService: FigurineService,
        private userService: UserService,
        private toastr: ToastrService,
    ) {
    }

    ngOnInit(): void {
        this.getFigurines()
    }

    getFigurines(startFigurine: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrFigurines: number = 20) {
        if (this.collection) {
            this.figurineService.getMyCollection(sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
                (figurines) => {
                    this.figurines.push(...figurines)
                },
                error => {
                    console.error(error)
                }
            )
        } else if (this.wishlist) {
            this.figurineService.getMyWishlist(sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
                (figurines) => {
                    this.figurines.push(...figurines)
                },
                error => {
                    console.error(error)
                }
            )

        } else {
            this.figurineService.getFigurinesForHome(sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
                (figurines) => {
                    this.figurines.push(...figurines)
                },
                error => {
                    console.error(error)
                }
            )
        }
    }

    onScroll() {
        const startFigurine: number = this.nbrFigurinesTotal;
        this.nbrFigurinesTotal += 20;
        this.getFigurines(startFigurine)
    }

    onRemoveCollection(idFigurine: string) {
        this.userService.removeToCollection(idFigurine).subscribe(
            () => {
                this.toastr.success('Figurine retirée de votre collection', 'Retirer');
                this.figurines = this.figurines.filter(figurine => figurine.id !== idFigurine)
            },
            error => {
                this.toastr.error(error, 'Erreur');
                console.error(error)
            }
        )
    }

    onRemoveWishlist(idFigurine: string) {
        this.userService.removeToWishlist(idFigurine).subscribe(
            () => {
                this.toastr.success('Figurine retirée de votre Wishlist', 'Retirer');
                this.figurines = this.figurines.filter(figurine => figurine.id !== idFigurine)
            },
            error => {
                this.toastr.error(error, 'Erreur');
                console.error(error)
            }
        )
    }
}
