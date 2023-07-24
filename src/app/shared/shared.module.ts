import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {MatLegacyMenuModule as MatMenuModule} from '@angular/material/legacy-menu';
import {MatLegacyButtonModule as MatButtonModule} from '@angular/material/legacy-button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FooterComponent} from './components/footer/footer.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import {MatBadgeModule} from "@angular/material/badge";
import {MatLegacyChipsModule as MatChipsModule} from "@angular/material/legacy-chips";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { AddListButtonComponent } from './components/add-list-button/add-list-button.component';
import { HoldersListComponent } from './components/holders-list/holders-list.component';
import { ResearchersListComponent } from './components/researchers-list/researchers-list.component';
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import {MatSidenavModule} from "@angular/material/sidenav";

@NgModule({
    declarations: [
        HeaderComponent,
        NotFoundComponent,
        FooterComponent,
        GalleryComponent,
        AddListButtonComponent,
        HoldersListComponent,
        ResearchersListComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatMenuModule,
        MatButtonModule,
        MatIconModule,
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        MatBadgeModule,
        MatChipsModule,
        MatTooltipModule,
        InfiniteScrollModule,
        MatFormFieldModule,
        MatInputModule,
        MatAutocompleteModule,
        MatSidenavModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        GalleryComponent,
        AddListButtonComponent,
        HoldersListComponent,
        ResearchersListComponent
    ]
})
export class SharedModule {
}
