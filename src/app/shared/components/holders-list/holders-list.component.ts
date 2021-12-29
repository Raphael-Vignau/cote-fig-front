import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../user/data/User";

@Component({
    selector: 'app-holders-list',
    templateUrl: './holders-list.component.html',
    styleUrls: ['./holders-list.component.css']
})
export class HoldersListComponent implements OnInit {
    @Input() holders!: User[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
