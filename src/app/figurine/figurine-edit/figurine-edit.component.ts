import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-figurine-edit',
    templateUrl: './figurine-edit.component.html',
    styleUrls: ['./figurine-edit.component.css']
})
export class FigurineEditComponent implements OnInit {
    idFigurine!: string | null;

    constructor(
        public route: ActivatedRoute,
    ) { }

    ngOnInit(): void {
        this.idFigurine = this.route.snapshot.paramMap.get('idFigurine');
    }
}
