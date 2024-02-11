import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductData, menuCategory } from '../../../models/menu-category-model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.scss'
})
export class CategoryProductComponent {
  formDataArray: Array<menuCategory> = [];

  // modifiedData: menuCategory[] = [];

  modifiedData: Array<menuCategory> = [];

  categoryProductArray: Array<ProductData> = [];

  displayedProducts: ProductData[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router
  ) {}

  ngOnInit() {
    this.categoryMenuRecursiveFilter();
    this.categoryProductFilter();

    // this.route.queryParams.subscribe(params => {
    //   // If there is a subcategoryId parameter, fetch products based on it
    //   if (params['subcategoryId']) {
    //     const subcategoryId = +params['subcategoryId']; // Convert the parameter to a number
    //     const subcategory = this.findCategoryById(subcategoryId);
    //     if (subcategory) {
    //       this.executeProductFilter(subcategory);
    //     }
    //   }
    // });
  }
  
  // Method to find a category by its ID
  // findCategoryById(categoryId: number): menuCategory | undefined {
  //   const findRecursive = (categories: menuCategory[]): menuCategory | undefined => {
  //     for (const category of categories) {
  //       if (category.categoryID === categoryId) {
  //         return category;
  //       }
  //       if (category.subsections) {
  //         const foundInSubcategory = findRecursive(category.subsections);
  //         if (foundInSubcategory) {
  //           return foundInSubcategory;
  //         }
  //       }
  //     }
  //     return undefined;
  //   };
  
  //   return findRecursive(this.modifiedData);
  // }
  

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

    this.router.navigate(['ecommerce-app', subcategory.categoryID], { queryParams: { subcategoryId: subcategory.categoryID } });

    console.log('hello', this.displayedProducts)

    console.log( this.router)
  }
}
