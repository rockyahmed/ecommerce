import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { AddEditProductModalComponent } from './add-edit-product-modal/add-edit-product-modal.component';
import { ProductData } from '../../../models/menu-category-model';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
  providers: [BsModalService,],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  modalRef: BsModalRef | undefined;

  productList: Array<ProductData> = [];

  constructor(private BsModalService: BsModalService) {}

  ngOnInit() {
    const storedData = localStorage.getItem('product-form-data');
    if (storedData !== null) {
      this.productList = JSON.parse(storedData);
    }
  }

  addEditProductModal() {
    this.modalRef = this.BsModalService.show(AddEditProductModalComponent, {
      class: 'modal-lg',
      initialState: {
        title: 'Product Modal',
      },
      backdrop: true,
      ignoreBackdropClick: true,
    });
  }
}
