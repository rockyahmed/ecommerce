import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProductCartService } from '../../shared/service/product-cart.service';
import { ProductData } from '../../models/menu-category-model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [RouterOutlet, RouterLink, BsDropdownModule, CommonModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent implements OnInit {
  
  
  productLength: number | null | undefined;

  cartAddedToProduct: ProductData[] = [];

  constructor(
    private productCartService: ProductCartService,
    
  ) {}

  ngOnInit(): void {
    // this.productCartService.productDataCount.subscribe(item => {
    //   this.itemsOfProduct = item;
    //   console.log(item);
    // });

    const cartStoreData = localStorage.getItem('cart');

    if (cartStoreData !== null) {
      this.cartAddedToProduct = JSON.parse(cartStoreData);
      this.productLength = this.cartAddedToProduct.length;
    }

    this.productCartService.productTotalList.subscribe((item) => {
      this.productLength = item.length;
      this.cartAddedToProduct = item;
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
      cartData.splice(index, 1);
      this.cartAddedToProduct = cartData;
      console.log(product.quantity)
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.productCartService.productTotalList.next(this.cartAddedToProduct);
    }
  }

 
}
