import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductData, menuCategory } from '../../../models/menu-category-model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-category-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category-product.component.html',
  styleUrl: './category-product.component.scss',
})
export class CategoryProductComponent {
  formDataArray: Array<menuCategory> = [];

  // modifiedData: menuCategory[] = [];

  modifiedData: Array<menuCategory> = [];

  categoryProductArray: Array<ProductData> = [];

  displayedProducts: ProductData[] = [];

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.categoryMenuRecursiveFilter();
    this.categoryProductFilter();

    this.routeSubscribe();
    
   
   
  }

  categoryMenuRecursiveFilter() {
    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);

      const buildRecursive = (
        parentId: number | null | undefined
      ): menuCategory[] => {
        const result: menuCategory[] = [];

        for (const item of this.formDataArray) {
          // Handle null, undefined, or empty string for fkParentID
          if (
            item.fkParentID == parentId ||
            (parentId == undefined && !item.fkParentID)
          ) {
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

    if (productStoreData !== null) {
      this.categoryProductArray = JSON.parse(productStoreData);
    }
  }

  routeSubscribe(){
    this.route.queryParams.subscribe((data: any) => {
      if(data){
       const filteredProducts = this.categoryProductArray.filter(
        (product) => product.productfkParentId == data.subcategoryId
      );
      this.displayedProducts = filteredProducts;
      }
    });
  }

  executeProductFilter(subcategory: menuCategory) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { subcategoryId: subcategory.categoryID },
      replaceUrl: true
    })
  }
}
