import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path         : 'internal',
    loadChildren : () => import('./internal/internal.routes').then(m => m.InternalRoutes)
  },
  {
    path       : '**',
    redirectTo : 'internal',
  }
];
