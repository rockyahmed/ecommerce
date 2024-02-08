import { Component, OnInit } from '@angular/core';
import { FormDataServiceService } from '../service/form-data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductData, menuCategory } from '../models/menu-category-model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ecommerce-app',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './ecommerce-app.component.html',
  styleUrl: './ecommerce-app.component.scss',
})
export class EcommerceAppComponent implements OnInit {
 
  formDataArray: Array<menuCategory> = [];

  // modifiedData: menuCategory[] = [];

  modifiedData: Array<menuCategory> = [];

  categoryProductArray: Array<ProductData> = [];

  displayedProducts: ProductData[] = [];

  constructor() {}

  ngOnInit() {
    this.categoryMenuRecursiveFilter();
    this.categoryProductFilter();
  }

  categoryMenuRecursiveFilter(){
    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    
      const buildRecursive = (parentId: number | null | undefined): menuCategory[] => {
        const result: menuCategory[] = [];
    
        for (const item of this.formDataArray) {
          // Handle null, undefined, or empty string for fkParentID
          if (item.fkParentID == parentId || (parentId == undefined && !item.fkParentID)) {
            const category: menuCategory = {
              categoryID: item.categoryID,
              categoryName: item.categoryName,
              fkParentID: item.fkParentID,
            };
    
            const children = buildRecursive(item.categoryID);
            if (children.length > 0) {
              category.subsections = children;
            }
    
            result.push(category);
          }
        }
    
        return result;
      };
    
      // Build the hierarchy starting from the root (categories with fkParentID === null or undefined)
      const topLevelCategories = buildRecursive(null);
    
      // Assign the result to this.modifiedData
      this.modifiedData = topLevelCategories;
    
      // console.log('Modified Data Array: ', this.modifiedData);
    }
  }

  categoryProductFilter() {
    const productStoreData = localStorage.getItem('product-form-data');

    if(productStoreData !== null) {
      this.categoryProductArray = JSON.parse(productStoreData)
    }
  }

  executeProductFilter(subcategory: menuCategory) {
    const filteredProducts = this.categoryProductArray.filter(product => product.productfkParentId == subcategory.categoryID);
  
    this.displayedProducts = filteredProducts;

    console.log('hello', this.displayedProducts)
  }


}
