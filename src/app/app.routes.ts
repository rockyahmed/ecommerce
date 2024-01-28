import { Routes } from '@angular/router';
import { EcommerceAppComponent } from './ecommerce-app/ecommerce-app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ecommerce-admin',
    pathMatch: 'full'
  },
  { path: 'ecommerce-admin', loadChildren: () => import('./ecommerce-admin-app/ecommerce-admin-app.module').then(m => m.EcommerceAdminAppModule) },
  {
    path: 'ecommerce-app',
    component: EcommerceAppComponent
  }
];
