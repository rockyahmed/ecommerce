import { Component, OnInit } from '@angular/core';
import { ProductData } from '../../../models/menu-category-model';
import { CommonModule } from '@angular/common';
import { ProductCartService } from '../../../shared/service/product-cart.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  checkoutProductList: ProductData[] = [];
  totalPrice: number | undefined;

  constructor(private productCartService: ProductCartService) {}

  ngOnInit(): void {
    this.totalPrice = 0; // Initialize totalPrice

    const checkoutStoreData = localStorage.getItem('cart');
    if (checkoutStoreData !== null) {
      this.checkoutProductList = JSON.parse(checkoutStoreData);

      this.checkoutProductList.forEach((product) => {
        if (
          product &&
          product.productPrice != null &&
          product.productDiscount != null
        ) {
          const discountedPrice =
            product.productPrice -
            product.productPrice * (product.productDiscount / 100);
          if (this.totalPrice !== undefined) {
            this.totalPrice += discountedPrice;
          }
        }
      });
    }

    this.productCartService.productTotalList.subscribe((item) => {
      this.checkoutProductList = item;
      console.log("item", item)
    });
  }

  removeFromCart(product: ProductData) {
    let cartData: ProductData[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    const index = cartData.findIndex(
      (item) => item.productId === product.productId
    );
    if (index !== -1) {
      product.quantity = 1;
      cartData.splice(index, 1);
      this.checkoutProductList = cartData;
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.productCartService.productTotalList.next(this.checkoutProductList);
    }
  }

}
