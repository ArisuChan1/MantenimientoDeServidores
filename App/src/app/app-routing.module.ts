import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SessionGuard } from './guards/auth.guard';
import { routesConfig } from './routes/routesConfig';

const routes: Routes = [
    {
        path: '',
        redirectTo: routesConfig.DASHBOARD,
        pathMatch: 'full',
    },
    {
        path: routesConfig.AUTH,
        loadChildren: () =>
            import('./modules/auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: routesConfig.DASHBOARD,
        loadChildren: () =>
            import('./modules/dashboard/dashboard.module').then(
                (m) => m.DashboardModule
            ),
        canActivate: [SessionGuard],
    },
    {
        path: routesConfig.SERVIDORES,
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
