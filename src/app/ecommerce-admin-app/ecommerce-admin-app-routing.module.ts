import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { EcommerceAdminAppComponent } from './ecommerce-admin-app.component';
import { MenuCategoryFormComponent } from './pages/menu-category-form/menu-category-form.component';
import { ProductSetupComponent } from './pages/product-setup/product-setup.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { UserRoleFormComponent } from './pages/user-role-form/user-role-form.component';
import { UserRoleSetupComponent } from './pages/user-role-setup/user-role-setup.component';

const routes: Routes = [
  {
    path: '',
    component: EcommerceAdminAppComponent,
    children: [
      { path: '', redirectTo: 'menu-category-form', pathMatch: 'full'},
      {path: 'home', component: HomeComponent},
      {path: 'menu-category-form', component: MenuCategoryFormComponent},
      {path: 'product-list', component: ProductListComponent},
      {path: 'product-setup', component: ProductSetupComponent},
      {path: 'user-role-setup', component:UserRoleSetupComponent},
      {path: 'user-role-form', component:UserRoleFormComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EcommerceAdminAppRoutingModule {}
