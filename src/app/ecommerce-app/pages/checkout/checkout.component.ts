import { Component, OnInit } from '@angular/core';
import { ProductData } from '../../../models/menu-category-model';
import { CommonModule } from '@angular/common';
import { ProductCartService } from '../../../shared/service/product-cart.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CustomerLoginModalComponent } from '../customer-login-modal/customer-login-modal.component';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  providers: [BsModalService],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  modalRef: BsModalRef | undefined;
  checkoutProductList: ProductData[] = [];
  totalPrice: number | undefined;

  constructor(private productCartService: ProductCartService, private BsModalService: BsModalService) {}

  ngOnInit(): void {
    this.totalPrice = 0; // Initialize totalPrice

    const checkoutStoreData = localStorage.getItem('cart');
    if (checkoutStoreData !== null) {
      this.checkoutProductList = JSON.parse(checkoutStoreData);

      this.calculateTotal();
    }

    this.productCartService.productTotalList.subscribe((item) => {
      this.checkoutProductList = item;
      this.totalPrice;
    });
  }

  calculateTotal() {
    this.totalPrice = 0;
    this.checkoutProductList.forEach((product) => {
      if (
        product &&
        product.productPrice != null &&
        product.productDiscount != null &&
        product.quantity != null
      ) {
        const discountedPrice =
          product.productPrice * product.quantity -
          product.productPrice *
            product.quantity *
            (product.productDiscount / 100);
        if (this.totalPrice !== undefined) {
          this.totalPrice += discountedPrice;
        }
      }
    });
  }

  increaseproductCount(product: ProductData) {
    this.checkoutProductList.forEach((quntityproduct) => {
      if (product.productId === quntityproduct.productId) {
        product.quantity++; // Increase quantity if product already exists in cart
    }
    })

    const isExistProduct = this.checkoutProductList.find((item) => item.productId === product.productId);
    if (isExistProduct) {
      let cartData: ProductData[] = this.checkoutProductList;
      this.calculateTotal();
      this.productCartService.productTotalList.next(this.checkoutProductList);
      localStorage.setItem('cart', JSON.stringify(cartData))
    }
  }

  removeFromCart(product: ProductData) {
    let cartData: ProductData[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    const index = cartData.findIndex(
      (item) => item.productId === product.productId
    );
    if (index !== -1) {
      cartData.splice(index, 1);
      this.checkoutProductList = cartData;
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.productCartService.productTotalList.next(this.checkoutProductList);
      // Recalculate total price
      this.calculateTotal();
    }
  }

  loginModal() {
    const initialState = {
      title: 'Login Form',
    };

    this.modalRef = this.BsModalService.show(CustomerLoginModalComponent, {
      class: 'modal-lg',
      initialState: initialState,
      backdrop: true,
      ignoreBackdropClick: true,
    });
  }
}
