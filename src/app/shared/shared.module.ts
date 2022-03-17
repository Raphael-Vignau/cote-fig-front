import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {RouterModule} from '@angular/router';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {FooterComponent} from './components/footer/footer.component';
import {GalleryComponent} from './components/gallery/gallery.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {NgxMasonryModule} from "ngx-masonry";
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import {MatTooltipModule} from "@angular/material/tooltip";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import { AddListButtonComponent } from './components/add-list-button/add-list-button.component';
import { HoldersListComponent } from './components/holders-list/holders-list.component';
import { ResearchersListComponent } from './components/researchers-list/researchers-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
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
        NgxMasonryModule,
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
