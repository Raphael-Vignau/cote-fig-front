import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { FigurineFormComponent } from '../figurine-form/figurine-form.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-figurine-edit',
    templateUrl: './figurine-edit.component.html',
    styleUrls: ['./figurine-edit.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, FigurineFormComponent]
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
