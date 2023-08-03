import { Component, Input, OnInit } from '@angular/core';
import { User } from "../../../user/data/User";
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
    selector: 'app-researchers-list',
    templateUrl: './researchers-list.component.html',
    styleUrls: ['./researchers-list.component.css'],
    standalone: true,
    imports: [MatCardModule, NgIf]
})
export class ResearchersListComponent implements OnInit {
    @Input() researchers!: User[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
