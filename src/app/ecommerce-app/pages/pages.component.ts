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

  cartProducts: ProductData[] = [];

  constructor(private productCartService: ProductCartService) {}

  ngOnInit(): void {
    // this.productCartService.productDataCount.subscribe(item => {
    //   this.itemsOfProduct = item;
    //   console.log(item);
    // });

    const cartStoreData = localStorage.getItem('cart');

    if (cartStoreData !== null) {
      this.cartProducts = JSON.parse(cartStoreData);
      this.productLength = this.cartProducts.length;
    }

    this.productCartService.productTotalList.subscribe((item) => {
      this.productLength = item.length;
      this.cartProducts = item;
    });

    
  }
}
