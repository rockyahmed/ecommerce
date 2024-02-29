import { Component, Input } from '@angular/core';
import { ProductData } from '../../../../models/menu-category-model';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: ProductData;

  quantity: number = 1;

  increaseQuantity(productId: number | null) {
    this.quantity++;
    console.log("Adding item with ProductId:", productId, "and quantity:", this.quantity, "to cart");
  }

  decreaseQuantity(productId: number | null) {
    if( this.quantity > 1 ){
      this.quantity--;
      console.log("Adding item with ProductId:", productId, "and quantity:", this.quantity, "to cart");
    }
  }

  addToCart(productId: number | null) {
    console.log("Adding item with ProductId:", productId, "and quantity:", this.quantity, "to cart");
  }
}
