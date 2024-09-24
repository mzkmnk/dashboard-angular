import { Routes } from '@angular/router';

export const InternalRoutes: Routes = [
  {
    path          : 'home',
    loadComponent : () => import('./home/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path       : '**',
    redirectTo : 'home'
  }
]