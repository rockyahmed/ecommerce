import { Routes } from '@angular/router';
import { EcommerceAdminAppComponent } from './ecommerce-admin-app/ecommerce-admin-app.component';
import { EcommerceAppComponent } from './ecommerce-app/ecommerce-app.component';

export const routes: Routes = [
  {
    path: '',
    component: EcommerceAdminAppComponent
  },
  {
    path: 'ecommerce-admin-app',
    component: EcommerceAdminAppComponent
  },
  {
    path: 'ecommerce-app',
    component: EcommerceAppComponent
  }
];
