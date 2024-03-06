import { Component, OnInit } from '@angular/core';
import { ProductData } from '../../../models/menu-category-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {

  checkoutProductList: ProductData[] = [];
  totalPrice: number | undefined;

  ngOnInit(): void {
    this.totalPrice = 0; // Initialize totalPrice

  const checkoutStoreData = localStorage.getItem("cart");
  if (checkoutStoreData !== null) {
    this.checkoutProductList = JSON.parse(checkoutStoreData);

    this.checkoutProductList.forEach(product => {
      if (product && product.productPrice != null && product.productDiscount != null) {
        const discountedPrice = product.productPrice - (product.productPrice * (product.productDiscount / 100));
        if(this.totalPrice !== undefined){
          this.totalPrice += discountedPrice;
        } 
      }
    });
  }
  }
}
