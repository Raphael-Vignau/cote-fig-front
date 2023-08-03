import { Component, OnInit } from '@angular/core';
import { FigurineFormComponent } from '../figurine-form/figurine-form.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-figurine-add',
    templateUrl: './figurine-add.component.html',
    styleUrls: ['./figurine-add.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatButtonModule, RouterLink, MatIconModule, FigurineFormComponent]
})
export class FigurineAddComponent implements OnInit {
    constructor(
    ) { }
    ngOnInit(): void {
    }
}
