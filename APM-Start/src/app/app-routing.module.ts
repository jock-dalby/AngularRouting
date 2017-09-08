import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth-guard.service';
import { SelectiveStrategy } from './selective-strategy.service';

const ROUTES = [
    { path: 'welcome', component: WelcomeComponent },
    {
        path: 'products',
        // canLoad: [AuthGuard], Means product files are not pre-loaded unless logged in
        canActivate: [AuthGuard],
        data: { preload: true },
        loadChildren: 'app/products/product.module#ProductModule'
    },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        // For enableTracing see Routing Events
        RouterModule.forRoot(ROUTES, { preloadingStrategy: SelectiveStrategy, enableTracing: true }),
        // RouterModule.forRoot(ROUTES, {useHash: true})
    ],
    providers: [SelectiveStrategy],
    exports: [RouterModule]
})

export class AppRoutingModule {

}