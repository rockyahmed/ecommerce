import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { menuCategory } from '../../../models/menu-category-model';

@Component({
  selector: 'app-product-setup',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './product-setup.component.html',
  styleUrl: './product-setup.component.scss',
})
export class ProductSetupComponent implements OnInit {

  formDataArray: Array<menuCategory> = [];

  productForm = this.fb.group({
    photo: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const storeData = localStorage.getItem('form-data');

    if(storeData !== null){
      this.formDataArray = JSON.parse(storeData);
    }
  }

  onSubmit() {
    console.log(this.productForm.value);
  }
}
