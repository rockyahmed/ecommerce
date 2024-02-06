import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { menuCategory, ProductData } from '../../../models/menu-category-model';

@Component({
  selector: 'app-product-setup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-setup.component.html',
  styleUrl: './product-setup.component.scss',
})
export class ProductSetupComponent implements OnInit {
  formDataArray: Array<menuCategory> = [];

  productFormArray: Array<ProductData> = [];

  private idCounter: number;

  productForm = this.fb.group({
    productId: ['', Validators.required],
    productTitle: ['', Validators.required],
    productPrice: ['', Validators.required],
    photo: [null],
    productDiscount: [''],
    productWeight: ['', Validators.required],
    productfkParentId: ['', Validators.required],
    productDescription: [''],
  });

  constructor(private fb: FormBuilder) {
    const storedIdCounter = localStorage.getItem('idCounter');
    this.idCounter = storedIdCounter ? parseInt(storedIdCounter) : 1;
  }

  ngOnInit() {
    const storeData = localStorage.getItem('form-data');

    if (storeData !== null) {
      this.formDataArray = JSON.parse(storeData);
    }
  }

  onSubmit() {
    const productFormData = this.productForm.value as ProductData;

    productFormData.productId = this.idCounter++;

    this.productFormArray.push(productFormData);

    localStorage.setItem(
      'product-form-data',
      JSON.stringify(this.productFormArray)
    );

    this.productForm.reset();
  }
}
