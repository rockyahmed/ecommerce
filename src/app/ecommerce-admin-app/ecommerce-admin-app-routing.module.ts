import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EcommerceAdminAppComponent } from './ecommerce-admin-app.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAdminAppComponent,
    children: [
      { path: '', redirectTo: 'category-form', pathMatch: 'full'},
      {path: 'category-form', component: HomeComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceAdminAppRoutingModule {}
