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

@NgModule({
    declarations: [
        HeaderComponent,
        NotFoundComponent,
        FooterComponent,
        GalleryComponent
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
        MatTooltipModule
    ],
    exports: [
        HeaderComponent,
        FooterComponent,
        GalleryComponent
    ]
})
export class SharedModule {
}
