import { Component } from '@angular/core';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-ecommerce-admin-app',
  standalone: true,
  imports: [HomeComponent],
  templateUrl: './ecommerce-admin-app.component.html',
  styleUrl: './ecommerce-admin-app.component.scss'
})
export class EcommerceAdminAppComponent {

}
