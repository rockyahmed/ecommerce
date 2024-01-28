import { Component, OnInit } from '@angular/core';
import { FormDataServiceService } from '../service/form-data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { menuCategory } from '../models/menu-category-model';

@Component({
  selector: 'app-ecommerce-app',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ecommerce-app.component.html',
  styleUrl: './ecommerce-app.component.scss'
})
export class EcommerceAppComponent implements OnInit {

  formDataArray: Array<menuCategory> = [];

  constructor() {}

  ngOnInit() {

    console.log(this.formDataArray)

    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    }
  }
}
