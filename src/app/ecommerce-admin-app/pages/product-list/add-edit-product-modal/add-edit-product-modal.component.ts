import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsModalRef, ModalModule } from 'ngx-bootstrap/modal';
import {
  ProductData,
  menuCategory,
} from '../../../../models/menu-category-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-product-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ModalModule],
  templateUrl: './add-edit-product-modal.component.html',
  styleUrl: './add-edit-product-modal.component.scss',
})
export class AddEditProductModalComponent {
  title = 'Modal Title';

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

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {
    const storedIdCounter = localStorage.getItem('idCounter');
    this.idCounter = storedIdCounter ? parseInt(storedIdCounter) : 1;
  }

  ngOnInit() {
    const storeData = localStorage.getItem('form-data');

    if (storeData !== null) {
      this.formDataArray = JSON.parse(storeData);
    }

    const productstoreData = localStorage.getItem('product-form-data');

    if (productstoreData !== null) {
      this.productFormArray = JSON.parse(productstoreData);
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
