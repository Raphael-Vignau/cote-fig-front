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

    getFigurines() {
        this.figurineService.getFigurinesForHome().subscribe(
            figurines => {
                this.figurines = figurines
            },
            error => {
                console.error(error)
            }
        )
    }
}
