import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@Component({
  selector: 'app-ecommerce-admin-app',
  standalone: true,
  imports: [RouterModule, AccordionModule],
  templateUrl: './ecommerce-admin-app.component.html',
  styleUrl: './ecommerce-admin-app.component.scss',
})
export class EcommerceAdminAppComponent {}
