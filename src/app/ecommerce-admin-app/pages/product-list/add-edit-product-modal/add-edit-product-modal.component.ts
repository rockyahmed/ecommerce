import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
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

  @Input() product: ProductData | null = null;
  productForm!: FormGroup;

  formDataArray: Array<menuCategory> = [];

  productFormArray: Array<ProductData> = [];

  // private idCounter: number;

  constructor(private fb: FormBuilder, public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.createForm();

    const storeData = localStorage.getItem('form-data');

    if (storeData !== null) {
      this.formDataArray = JSON.parse(storeData);
    }
    if (!this.getProductId()) {
      this.productForm.get('productId')?.setValue(1);
    } else {
      this.productForm.get('productId')?.setValue(this.getProductId());
    }
    const productstoreData = localStorage.getItem('product-form-data');

    if (productstoreData !== null) {
      this.productFormArray = JSON.parse(productstoreData);
    }

    if (this.product !== null) {
      this.productForm.patchValue({
        productId: this.product.productId,
        productTitle: this.product.productTitle,
      });
    }
  }

  createForm() {
    this.productForm = this.fb.group({
      productId: ['', Validators.required],
      productTitle: ['', Validators.required],
      productPrice: ['', Validators.required],
      photo: [null],
      productDiscount: [''],
      productWeight: ['', Validators.required],
      productfkParentId: ['', Validators.required],
      productDescription: ['',],
    });
  }

  onSubmit() {
    const productFormData = this.productForm.value as ProductData;
    if (!this.product) {
      this.productFormArray.push(productFormData);

      localStorage.setItem(
        'product-form-data',
        JSON.stringify(this.productFormArray)
      );

      this.productForm.reset();
      if (!this.getProductId()) {
        this.productForm.get('productId')?.setValue(1);
      } else {
        this.productForm.get('productId')?.setValue(this.getProductId());
      }
    } else {
      const existProduct = this.productFormArray.findIndex(
        (p) => p.productId === this.product?.productId
      );
      if (!existProduct) {
        alert('product not found');
      } else {
        this.productFormArray[existProduct].productTitle =
          productFormData.productTitle;
        this.productFormArray[existProduct].productPrice =
          productFormData.productPrice;

        localStorage.setItem(
          'product-form-data',
          JSON.stringify(this.productFormArray)
        );
      }
    }
  }

  private getProductId() {
    const productStoreData = localStorage.getItem('product-form-data');
    if (productStoreData !== null) {
      const productFormArray = JSON.parse(productStoreData);
      return productFormArray[productFormArray?.length - 1].productId + 1;
    }
    return 0;
  }
}
