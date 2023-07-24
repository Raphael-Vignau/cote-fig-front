import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UserAddComponent} from "./user-add/user-add.component";
import {UserListComponent} from './user-list/user-list.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatIconModule} from "@angular/material/icon";
import {MatLegacyMenuModule as MatMenuModule} from "@angular/material/legacy-menu";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {MatLegacyPaginatorModule as MatPaginatorModule} from "@angular/material/legacy-paginator";
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from "@angular/material/legacy-progress-spinner";
import {MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {MatBadgeModule} from "@angular/material/badge";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {UserService} from "./services/user.service";
import {UserRoutingModule} from "./user-routing.module";
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import {ProfileComponent} from './profile/profile.component';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from "@angular/material/legacy-slide-toggle";
import {MatDividerModule} from "@angular/material/divider";
import {UserFormComponent} from './user-form/user-form.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {SharedModule} from "../shared/shared.module";

@NgModule({
    declarations: [
        UserAddComponent,
        UserListComponent,
        UserEditComponent,
        ProfileComponent,
        UserFormComponent
    ],
    imports: [
        CommonModule,
        UserRoutingModule,
        MatTableModule,
        MatPaginatorModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatProgressBarModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatMenuModule,
        MatIconModule,
        MatCardModule,
        MatChipsModule,
        MatTooltipModule,
        MatBadgeModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatToolbarModule,
        SharedModule
    ],
    providers: [UserService],
    exports: [ProfileComponent]
})
export class UserModule {
}
