import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserAddComponent} from "./user-add/user-add.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {CollectionComponent} from "./collection/collection.component";
import {WishlistComponent} from "./wishlist/wishlist.component";

const routes: Routes = [
    {
        path: '',
        component: UserListComponent
    },
    {
        path: 'add',
        component: UserAddComponent
    },
    {
        path: 'edit/:idUser',
        component: UserEditComponent
    },
    {
        path: 'collection',
        component: CollectionComponent
    },
    {
        path: 'wishlist',
        component: WishlistComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {
}
