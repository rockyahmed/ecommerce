import { Component, Input, OnInit } from '@angular/core';
import { ProductData } from '../../../../models/menu-category-model';
import { ProductCartService } from '../../../../shared/service/product-cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent implements OnInit {
  @Input() product!: ProductData;

  quntity: number = 1;
  cartAddedToProduct: ProductData[] = [];

  constructor(private productCartService: ProductCartService) {}

  ngOnInit(): void {
    // this.productCartService.productDataCount.subscribe((item) => {
    //   this.quntity = item;
    // });
    this.product.quantity = 1;
    this.loadCartFromLocalStorage();

    const quantityStore = this.cartAddedToProduct.find(
      (item) => item.productId === this.product.productId
    );
    if (quantityStore) {
      this.product.quantity = quantityStore.quantity;
    }
  }

  loadCartFromLocalStorage() {
    const cartStoreData = localStorage.getItem('cart');
    if (cartStoreData !== null) {
      this.cartAddedToProduct = JSON.parse(cartStoreData);
    }
  }

  isProductInCart(product: ProductData) {
    return this.cartAddedToProduct.some(
      (itme) => itme.productId === product.productId
    );
  }

  increaseproductCount(product: ProductData) {
    this.product.quantity++;
    // this.productCartService.updateProductCount(this.quntity);
    // const cartStoreData = this.loadCartFromLocalStorage();

    const isExistProduct = this.cartAddedToProduct.find((item) => item.productId === product.productId);
    console.log(isExistProduct);

    if (isExistProduct) {
      let cartData: ProductData[] = this.cartAddedToProduct;
      isExistProduct.quantity += 1;
      this.productCartService.productTotalList.next(this.cartAddedToProduct);
      localStorage.setItem('car', JSON.stringify(cartData))
    }
  }

  decreaseproductCount() {
    if (this.product.quantity > 1) {
      this.product.quantity--;
      // this.productCartService.updateProductCount(this.quntity);
    }
  }

  addToCart(product: ProductData) {
    let cartData: ProductData[] = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );
    if (product && !this.isProductInCart(product)) {
      cartData.push(product);
      this.cartAddedToProduct = cartData;
      localStorage.setItem('cart', JSON.stringify(cartData)); // Update local storage
      // this.productCartService.updateProductCount(this.quntity); // Update product count
      this.productCartService.productTotalList.next(this.cartAddedToProduct); // Update product count
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
      localStorage.setItem('cart', JSON.stringify(cartData));
      this.cartAddedToProduct = cartData; // Update cartAddedToProduct
      // this.productCartService.updateProductCount(this.quntity);
      this.productCartService.productTotalList.next(this.cartAddedToProduct);
    }
  }
}
