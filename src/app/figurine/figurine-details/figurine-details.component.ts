import {Component, OnInit} from '@angular/core';
import {Figurine} from "../data/Figurine";
import {environment} from "../../../environments/environment";
import {ActivatedRoute, Router} from "@angular/router";
import {FigurineService} from "../services/figurine.service";

@Component({
    selector: 'app-figurine-details',
    templateUrl: './figurine-details.component.html',
    styleUrls: ['./figurine-details.component.css']
})
export class FigurineDetailsComponent implements OnInit {
    figurine!: Figurine;
    authUrl = environment.api_base_url;

    constructor(
        private figurineService: FigurineService,
        public route: ActivatedRoute,
        public router: Router
    ) {}

    ngOnInit(): void {
        const idFigurine = this.route.snapshot.paramMap.get('idFigurine');
        if (idFigurine) {
            this.getFigurine(idFigurine)
        }
    }

    getFigurine(idFigurine: string): void {
        this.figurineService.getOneFigurine(idFigurine).subscribe({
            next: (figurine: Figurine) => {
                this.figurine = figurine;
            },
            error: () => {
                this.router.navigate(['/not-found']).then()
            }
        })
    }

}
