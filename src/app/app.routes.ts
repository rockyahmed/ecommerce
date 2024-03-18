import { Routes } from '@angular/router';
import { EcommerceAppComponent } from './ecommerce-app/ecommerce-app.component';
import { PagesComponent } from './ecommerce-app/pages/pages.component';
import { CategoryProductComponent } from './ecommerce-app/pages/category-product/category-product.component';
import { CustomerFormComponent } from './ecommerce-app/pages/customer-form/customer-form.component';
import { CheckoutComponent } from './ecommerce-app/pages/checkout/checkout.component';
import { PaymentComponent } from './ecommerce-app/pages/payment/payment.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'ecommerce-admin',
    pathMatch: 'full',
  },
  {
    path: 'ecommerce-admin',
    loadChildren: () =>
      import('./ecommerce-admin-app/ecommerce-admin-app.module').then(
        (m) => m.EcommerceAdminAppModule
      ),
  },
  {
    path: 'ecommerce-app',
    component: EcommerceAppComponent,
    children: [
      {
        path: 'pages',
        component: PagesComponent,
        children: [
          {
            path: '',
            redirectTo: 'category-product',
            pathMatch: 'full',
          },
          {
            path: 'category-product',
            component: CategoryProductComponent,
          },
          {
            path: 'customer-form',
            component: CustomerFormComponent,
          },
          {
            path: 'checkout',
            component: CheckoutComponent,
          },
          {
            path: 'payment',
            component: PaymentComponent,
          },
        ],
      },
    ],
  },
  // {
  //   path: 'ecommerce-app/:id',
  //   component: EcommerceAppComponent,
  // }
];
