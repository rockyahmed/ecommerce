import { Component, OnInit } from '@angular/core';
import { FormDataServiceService } from '../service/form-data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { menuCategory } from '../models/menu-category-model';

@Component({
  selector: 'app-ecommerce-app',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ecommerce-app.component.html',
  styleUrl: './ecommerce-app.component.scss',
})
export class EcommerceAppComponent implements OnInit {
 
  formDataArray: Array<menuCategory> = [];

  // modifiedData: menuCategory[] = [];

  modifiedData: Array<menuCategory> = [];

  constructor() {}

  ngOnInit() {
    console.log(this.formDataArray);

    const storedData = localStorage.getItem('form-data');

    // if (storedData !== null) {
    //   this.formDataArray = JSON.parse(storedData);

    //   const emptyfkid = this.formDataArray.filter(
    //     (item) => item.fkParentID === null
    //   );

    //   for (const item of emptyfkid) {
    //     const category = {} as menuCategory;
    //     category.categoryID = item.categoryID;
    //     category.categoryName = item.categoryName;
    //     const childrenItem = this.formDataArray.filter(
    //       (x) => x.fkParentID == item.categoryID
    //     );
    //     for (const c of childrenItem) {
    //       const children2 = this.formDataArray.filter(
    //         (y) => y.fkParentID == c.categoryID
    //       );
    //       const category2 = {} as menuCategory;
    //       category2.categoryID = c.categoryID;
    //       category2.categoryName = c.categoryName;
    //       c.subsections = [...children2];
    //     }

    //     category.subsections = [...childrenItem];
    //     this.modifiedData.push(category);

    //     console.log('Modified Data Array: ', this.modifiedData);
    //   }
    // }


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
    
      console.log('Modified Data Array: ', this.modifiedData);
    }


  }

}
