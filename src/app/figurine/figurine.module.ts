import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FigurineRoutingModule} from './figurine-routing.module';
import {FigurineListComponent} from "./figurine-list/figurine-list.component";
import {FigurineAddComponent} from "./figurine-add/figurine-add.component";
import {FigurineEditComponent} from "./figurine-edit/figurine-edit.component";
import {FigurineService} from "./services/figurine.service";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialFileInputModule} from "ngx-material-file-input";
import {FigurineFormComponent} from './figurine-form/figurine-form.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {FigurineDetailsComponent} from './figurine-details/figurine-details.component';
import {MatCardModule} from "@angular/material/card";
import {MatChipsModule} from "@angular/material/chips";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        FigurineListComponent,
        FigurineAddComponent,
        FigurineEditComponent,
        FigurineFormComponent,
        FigurineDetailsComponent
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
        MaterialFileInputModule,
        MatToolbarModule,
        MatCardModule,
        MatChipsModule,
        SharedModule
    ],
    providers: [
        FigurineService
    ]
})
export class FigurineModule {
}
