import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ProductData } from '../../models/menu-category-model';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  productCount: Subject<number> = new Subject();
  // productDataCount: Observable<any> = this.productCount.asObservable();

  productTotalList: Subject<ProductData[]> = new Subject();

  productTotalPrice: Subject<number> = new Subject();

  constructor() { 
  }

  // updateProductCount(count: any){
  //   this.productCount.next(count);
  // }
}
