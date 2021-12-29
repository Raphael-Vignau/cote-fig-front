import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../user/data/User";

@Component({
    selector: 'app-researchers-list',
    templateUrl: './researchers-list.component.html',
    styleUrls: ['./researchers-list.component.css']
})
export class ResearchersListComponent implements OnInit {
    @Input() researchers!: User[];

    constructor() {
    }

    ngOnInit(): void {
    }

}
