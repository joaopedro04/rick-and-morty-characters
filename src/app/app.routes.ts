import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'home',
                loadComponent: () =>
                    import('./features/home/home.component').then(
                        (m) => m.HomeComponent
                    ),
            },
            {
                path: 'favorites',
                loadComponent: () =>
                    import('./features/favorites/favorites.component').then(
                        (m) => m.FavoritesComponent
                    ),
            },
            {
                path: '**',
                redirectTo: 'home',
                pathMatch: 'full',
            },
        ],
    },
];
