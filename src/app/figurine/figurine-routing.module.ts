import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FigurineListComponent } from "./figurine-list/figurine-list.component";
import { FigurineAddComponent } from "./figurine-add/figurine-add.component";
import { FigurineEditComponent } from "./figurine-edit/figurine-edit.component";

const routes: Routes = [
    {
        path: '',
        component: FigurineListComponent
    },
    {
        path: 'add',
        component: FigurineAddComponent
    },
    {
        path: 'edit/:idFigurine',
        component: FigurineEditComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FigurineRoutingModule {
}
