import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AddEditProductModalComponent } from './add-edit-product-modal/add-edit-product-modal.component';
import { ProductData } from '../../../models/menu-category-model';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ModalModule,
    BsDropdownModule,
  ],
  providers: [BsModalService],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  modalRef: BsModalRef | undefined;

  productList: Array<ProductData> = [];
  archivedProducts: Array<ProductData> = [];

  constructor(private BsModalService: BsModalService) {}

  ngOnInit() {
    const storedData = localStorage.getItem('product-form-data');
    if (storedData !== null) {
      this.productList = JSON.parse(storedData);
    }

    const archivedData = localStorage.getItem('archived-products');
    if(archivedData !== null){
      this.archivedProducts = JSON.parse(archivedData);
    }
  }

  addEditProductModal(product: ProductData | null = null) {
    const initialState = {
      title: 'Product Modal',
      product: product, // Pass the selected product here
    };

    this.modalRef = this.BsModalService.show(AddEditProductModalComponent, {
      class: 'modal-lg',
      initialState: initialState,
      backdrop: true,
      ignoreBackdropClick: true,
    });
  }

  deleteProduct(productIndex: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      const deletedProduct = this.productList.splice(productIndex, 1)[0]; // Remove the product from the list
      this.archivedProducts.push(deletedProduct); // Move the deleted product to the archive array
      localStorage.setItem('product-form-data', JSON.stringify(this.productList)); // Update localStorage
      localStorage.setItem('archived-products', JSON.stringify(this.archivedProducts)); // Update localStorage with archived products
    }
  }
}
