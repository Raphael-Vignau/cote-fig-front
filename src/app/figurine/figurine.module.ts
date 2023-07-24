import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FigurineRoutingModule} from './figurine-routing.module';
import {FigurineListComponent} from "./figurine-list/figurine-list.component";
import {FigurineAddComponent} from "./figurine-add/figurine-add.component";
import {FigurineEditComponent} from "./figurine-edit/figurine-edit.component";
import {FigurineService} from "./services/figurine.service";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {ReactiveFormsModule} from "@angular/forms";
import {FigurineFormComponent} from './figurine-form/figurine-form.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {SharedModule} from "../shared/shared.module";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatBadgeModule} from "@angular/material/badge";

@NgModule({
    declarations: [
        FigurineListComponent,
        FigurineAddComponent,
        FigurineEditComponent,
        FigurineFormComponent
    ],
    imports: [
        CommonModule,
        FigurineRoutingModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatCardModule,
        MatChipsModule,
        SharedModule,
        MatAutocompleteModule,
        MatBadgeModule
    ],
    providers: [
        FigurineService
    ]
})
export class FigurineModule {
}
