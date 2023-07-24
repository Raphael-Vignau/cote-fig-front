import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FigurineService} from "../../../figurine/services/figurine.service";
import {Figurine} from "../../../figurine/data/Figurine";
import {environment} from "../../../../environments/environment";
import {UserService} from "../../../user/services/user.service";
import {ToastrService} from "ngx-toastr";
import {fromEvent, of} from "rxjs";
import {catchError, debounceTime, distinctUntilChanged, tap} from "rxjs/operators";
import {Tag} from "../../../tag/data/tag";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {TagService} from "../../../tag/services/tag.service";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit, AfterViewInit {
    @ViewChild('tagInput') tagInput!: ElementRef<HTMLInputElement>;
    tagsSelected: Array<Tag> = [];
    allTags!: Array<Tag>;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @Input() collection: boolean = false;
    @Input() wishlist: boolean = false;
    figurines: Figurine[] = [];
    authUrl = environment.api_base_url;
    nbrFigurinesTotal: number = 20
    // public masonryOptions: NgxMasonryOptions = {
    //     columnWidth: '.masonry-item',
    //     itemSelector: '.masonry-item',
    //     fitWidth: true,
    //     gutter: 10,
    //     resize: true,
    //     initLayout: true,
    //     horizontalOrder: true
    // };

    // @ViewChild(NgxMasonryComponent) masonry!: NgxMasonryComponent;

    constructor(
        private figurineService: FigurineService,
        private userService: UserService,
        private toastr: ToastrService,
        private tagService: TagService,
    ) {
    }

    ngOnInit(): void {
        this.getFigurines();
        this.getAllTags();
    }

    ngAfterViewInit(): void {
        // server-side search
        fromEvent(this.tagInput.nativeElement, 'keyup').pipe(
            debounceTime(500),
            distinctUntilChanged(),
            tap(() => {
                this.getAllTags();
            })
        ).subscribe();
    }

    getFigurines(tags: Tag[] = [], startFigurine: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrFigurines: number = 20) {
        if (this.collection) {
            this.figurineService.getMyCollection(sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
                (figurines) => {
                    this.figurines.push(...figurines)
                },
                error => console.error(error)
            )
        } else if (this.wishlist) {
            this.figurineService.getMyWishlist(sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
                (figurines) => {
                    this.figurines.push(...figurines)
                },
                error => console.error(error)
            )

        } else {
            this.figurineService.getFigurinesForHome(tags, sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
                (figurines) => {
                    this.figurines.push(...figurines)
                },
                error => console.error(error)
            )
        }
    }

    getAllTags() {
        this.tagService.getTags(this.tagInput?.nativeElement.value)
            .pipe(catchError(() => of([]))).subscribe(
            (tags: Tag[]) => this.allTags = tags
        )
    }

    onSelectedTag(event: MatAutocompleteSelectedEvent): void {
        const tagForm = {
            name: event.option.value.name,
            rating: event.option.value.rating
        };
        this.tagsSelected.push(tagForm);

        if (this.tagInput) {
            this.tagInput.nativeElement.value = '';
        }
        this.figurines = [];
        this.getFigurines(this.tagsSelected)
    }

    onRemoveTag(index: number): void {
        if (index >= 0) {
            this.tagsSelected.splice(index,1);
            this.figurines = [];
            this.getFigurines(this.tagsSelected)
        }
    }

    onScroll() {
        const startFigurine: number = this.nbrFigurinesTotal;
        this.nbrFigurinesTotal += 20;
        this.getFigurines(this.tagsSelected, startFigurine)
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
