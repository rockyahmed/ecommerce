import { Component, Input } from '@angular/core';
import { ProductData } from '../../../../models/menu-category-model';
import { ProductCartService } from '../../../../shared/service/product-cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: ProductData;

  productCount: number = 1;

  constructor(private productCartService: ProductCartService) {

  }

  increaseproductCount(productId: number | null) {
    this.productCount++;
    console.log("Adding item with ProductId:", productId, "and productCount:", this.productCount, "to cart");
  }

  decreaseproductCount(productId: number | null) {
    if( this.productCount > 1 ){
      this.productCount--;
      console.log("Adding item with ProductId:", productId, "and productCount:", this.productCount, "to cart");
    }
  }


  updateProductCount() {
    this.productCount++;
    this.productCartService.updateProductCount(this.productCount)
  }


  addToCart(productId: number | null) {
    // console.log("Adding item with ProductId:", productId, "and productCount:", this.productCount, "to cart");
    this.updateProductCount();
    console.log('Product added to cart')
  }
}
