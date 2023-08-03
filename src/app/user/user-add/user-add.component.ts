import {Component, OnInit} from '@angular/core';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatLegacyButtonModule } from '@angular/material/legacy-button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-user-add',
    templateUrl: './user-add.component.html',
    styleUrls: ['./user-add.component.css'],
    standalone: true,
    imports: [MatToolbarModule, MatLegacyButtonModule, RouterLink, MatIconModule, UserFormComponent]
})
export class UserAddComponent implements OnInit {

    constructor(
    ) {}

    ngOnInit(): void {
    }
}
