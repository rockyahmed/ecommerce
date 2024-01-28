import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EcommerceAdminAppComponent } from './ecommerce-admin-app.component';
import { MenuCategoryFormComponent } from './pages/menu-category-form/menu-category-form.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAdminAppComponent,
    children: [
      { path: '', redirectTo: 'menu-category-form', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'menu-category-form', component: MenuCategoryFormComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceAdminAppRoutingModule {}
