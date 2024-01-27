import { Routes } from '@angular/router';
import { EcommerceAdminAppComponent } from './ecommerce-admin-app/ecommerce-admin-app.component';
import { EcommerceAppComponent } from './ecommerce-app/ecommerce-app.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ecommerce-admin',
    pathMatch: 'full'
  },
  { path: 'ecommerce-admin', loadChildren: () => import('./ecommerce-admin-app/ecommerce-admin-app.module').then(m => m.EcommerceAdminAppModule) },
  {path: 'ecommerce-admin', component: EcommerceAdminAppComponent},
  {
    path: 'ecommerce-app',
    component: EcommerceAppComponent
  }
];
