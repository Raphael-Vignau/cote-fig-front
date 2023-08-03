import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Meta, Title } from "@angular/platform-browser";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true
})
export class HomeComponent implements OnInit {
    logged = false;

    constructor(
        private metaService: Meta,
        private titleService: Title,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.titleService.setTitle('Cote-Fig');
        this.metaService.updateTag({
            property: 'og:image',
            content: 'url_img'
        });
        this.metaService.updateTag({
            property: 'og:type',
            content: 'website'
        });
        this.metaService.updateTag({
            property: 'og:title',
            content: 'Cote-Fig'
        });
        this.metaService.updateTag({
            property: 'og:url ',
            content: window.location.href
        });
        this.metaService.updateTag({
            property: 'og:description  ',
            content: 'description du site'
        })
    }
}
