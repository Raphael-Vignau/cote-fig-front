import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../../user/data/User";
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-holders-list',
    templateUrl: './holders-list.component.html',
    styleUrls: ['./holders-list.component.css'],
    standalone: true,
    imports: [MatCardModule, NgIf]
})
export class HoldersListComponent implements OnInit {
    @Input() holders!: User[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
