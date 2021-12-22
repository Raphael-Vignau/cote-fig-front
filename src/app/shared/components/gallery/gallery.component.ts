import {Component, OnInit} from '@angular/core';
import {FigurineService} from "../../../figurine/services/figurine.service";
import {Figurine} from "../../../figurine/data/Figurine";
import {environment} from "../../../../environments/environment";
import {NgxMasonryOptions} from "ngx-masonry";

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
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

    constructor(
        private figurineService: FigurineService,
    ) {
    }

    ngOnInit(): void {
        this.getFigurines()
    }

    getFigurines(startFigurine: number = 0, sortBy: string = 'createdAt', sortDirection: string = 'DESC', nbrFigurines: number = 20) {
        this.figurineService.getFigurinesForHome(sortBy, sortDirection, startFigurine, nbrFigurines).subscribe(
            (figurines) => {
                this.figurines.push(...figurines)
            },
            error => {
                console.error(error)
            }
        )
    }

    onScroll() {
        const startFigurine: number = this.nbrFigurinesTotal;
        this.nbrFigurinesTotal += 20;
        this.getFigurines(startFigurine)
    }
}
