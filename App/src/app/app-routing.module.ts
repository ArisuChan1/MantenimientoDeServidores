import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessionGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'servidores',
        pathMatch: 'full',
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'servidores',
        loadChildren: () =>
            import('./modules/servidores/servidores.module').then(
                (m) => m.ServidoresModule
            ),
        canActivate: [SessionGuard],
    },
    { path: '**', redirectTo: '/auth' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled',
            onSameUrlNavigation: 'reload',
        }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
