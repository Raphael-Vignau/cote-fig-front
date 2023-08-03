import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagRoutingModule } from './tag-routing.module';
import { TagListComponent } from "./tag-list/tag-list.component";
import { TagService } from "./services/tag.service";

@NgModule({
    imports: [
        CommonModule,
        TagRoutingModule,
        TagListComponent
    ],
    providers: [TagService]
})
export class TagModule {
}
