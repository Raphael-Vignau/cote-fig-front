import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {LoggedInGuardService} from './shared/services/logged-in-guard.service';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {ContactComponent} from "./pages/contact/contact.component";
import {AuthGuard} from "./_helpers/auth.guard";
import {Role} from "./user/data/Role";
import {ProfileComponent} from "./user/profile/profile.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {FigurineDetailsComponent} from "./figurine/figurine-details/figurine-details.component";
import {CollectionComponent} from "./user/collection/collection.component";
import {WishlistComponent} from "./user/wishlist/wishlist.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'figurine/details/:idFigurine',
        component: FigurineDetailsComponent
    },
    {
        path: 'collection',
        canActivate: [LoggedInGuardService],
        component: CollectionComponent
    },
    {
        path: 'wishlist',
        canActivate: [LoggedInGuardService],
        component: WishlistComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: 'contact',
        component: ContactComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: () => import('./user/user.module').then(m => m.UserModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'figurine',
        canActivate: [AuthGuard],
        loadChildren: () => import('./figurine/figurine.module').then(m => m.FigurineModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'tag',
        canActivate: [AuthGuard],
        loadChildren: () => import('./tag/tag.module').then(m => m.TagModule),
        data: {roles: [Role.ADMIN]}
    },
    {
        path: 'me',
        canActivate: [LoggedInGuardService],
        component: ProfileComponent
    },
    {
        path: 'not-found',
        component: NotFoundComponent,
    },
    {
        path: '**',
        redirectTo: '/not-found'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: PreloadAllModules
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
