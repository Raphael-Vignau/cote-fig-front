import {Component, OnInit} from '@angular/core';
import {Figurine} from "../data/Figurine";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {FigurineService} from "../services/figurine.service";
import {Title, Meta} from '@angular/platform-browser';
import {AuthService} from "../../shared/services/auth.service";
import {Role} from "../../user/data/Role";
import { ResearchersListComponent } from '../../shared/components/researchers-list/researchers-list.component';
import { HoldersListComponent } from '../../shared/components/holders-list/holders-list.component';
import { AddListButtonComponent } from '../../shared/components/add-list-button/add-list-button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-figurine-details',
    templateUrl: './figurine-details.component.html',
    styleUrls: ['./figurine-details.component.css'],
    standalone: true,
    imports: [NgIf, MatCardModule, MatIconModule, AddListButtonComponent, HoldersListComponent, ResearchersListComponent]
})
export class FigurineDetailsComponent implements OnInit {
    figurine!: Figurine;
    authUrl = environment.api_base_url;
    logged: boolean = false;
    isAdmin: boolean = false;

    constructor(
        private _authService: AuthService,
        private figurineService: FigurineService,
        public route: ActivatedRoute,
        private metaService: Meta,
        private titleService: Title,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.getMe();
        const idFigurine = this.route.snapshot.paramMap.get('idFigurine');
        if (idFigurine) {
            this.getFigurine(idFigurine)
        }
    }

    getMe(): void {
        this.logged = !!this._authService.currentUserValue;
        this.isAdmin = this._authService.currentUserValue?.role === Role.ADMIN
    }

    getFigurine(idFigurine: string): void {
        this.figurineService.getOneFigurine(idFigurine).subscribe({
            next: (figurine: Figurine) => {
                this.figurine = figurine;
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            },
            complete: () => {
                this.titleService.setTitle(this.figurine.name);
                this.metaService.updateTag({
                    property: 'og:image',
                    content: this.authUrl + '/figurines/file/' + this.figurine.img_name
                });
                this.metaService.updateTag({
                    property: 'og:type',
                    content: 'website'
                });
                this.metaService.updateTag({
                    property: 'og:title',
                    content: this.figurine.name
                });
                this.metaService.updateTag({
                    property: 'og:url ',
                    content: window.location.href
                });
                this.metaService.updateTag({
                    property: 'og:description  ',
                    content: this.figurine.description
                });
            }
        })
    }

}
