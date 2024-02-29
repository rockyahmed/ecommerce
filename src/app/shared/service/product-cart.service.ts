import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductCartService {

  productCount = new Subject();
  productDataCount: Observable<any> = this.productCount.asObservable();

  constructor() { }

  updateProductCount(count: any){
    this.productCount.next(count);
  }
}
