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
  // menuCreateForm = this.formBuilder.group({
  //   categoryName: ['', Validators.required],
  //   categoryID: ['', Validators.required],
  //   fkParentID: ['',]
  // });

  // formDataArray: Array<menuCategory> = [];
  // subsections: Array<menuCategory> = []

  // constructor(private formBuilder: FormBuilder) {}

  // ngOnInit() {
  //   const storedData = localStorage.getItem('form-data');

  //   if (storedData !== null) {
  //     this.formDataArray = JSON.parse(storedData);
  //     // this.subsections = this.buildSubsections(this.formDataArray);
  //   }
  // }

  // onSubmit() {
  //   console.log(this.formDataArray);
  //   console.log(this.subsections);

  //   const formData = this.menuCreateForm.value as menuCategory;

  //   const categoryIdExists = this.formDataArray.some(
  //     (entry: menuCategory) => entry.categoryID === formData.categoryID
  //   );

  //   if (categoryIdExists) {
  //     window.alert(
  //       `Category ID ${formData.categoryID} already exists. Entry again not possible.`
  //     );
  //   } else {
  //     this.formDataArray.push(formData);

  //     // Find items in formDataArray where categoryID matches fkParentID
  //     const matchingSubsections = this.formDataArray.filter(
  //       (entry: menuCategory) => entry.categoryID === formData.fkParentID
  //     );

  //     // Add the matching subsections to the subsections array
  //     this.subsections.push(...matchingSubsections);

  //     localStorage.setItem('form-data', JSON.stringify(this.formDataArray));

  //     this.menuCreateForm.reset();
  //   }
  // }

  // buildSubsections(formDataArray: menuCategory[]): menuCategory[] {
  //   const result: menuCategory[] = [];

  //   formDataArray.forEach(formData => {
  //     const matchingChild = formDataArray.find(child => child.fkParentID === formData.categoryID);

  //     if (matchingChild) {
  //       const existingSubsection = result.find(item => item.categoryID === formData.categoryID);

  //       if (existingSubsection) {
  //         existingSubsection.subsections = existingSubsection.subsections || [];
  //         existingSubsection.subsections.push(matchingChild);
  //       } else {
  //         const newSubsection: menuCategory = { ...formData, subsections: [matchingChild] };
  //         result.push(newSubsection);
  //       }
  //     }
  //   });

  //   return result;
  // }

  formDataArray: Array<menuCategory> = [];

  modifiedData: menuCategory[] = [];

  // modifiedData: Array<menuCategory> = [];

  constructor() {}

  ngOnInit() {
    console.log(this.formDataArray);

    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);

      const emptyfkid = this.formDataArray.filter(
        (item) => item.fkParentID === null
      );

      for (const item of emptyfkid) {
        const category = {} as menuCategory;
        category.categoryID = item.categoryID;
        category.categoryName = item.categoryName;
        const childrenItem = this.formDataArray.filter(
          (x) => x.fkParentID == item.categoryID
        );
        for (const c of childrenItem) {
          const children2 = this.formDataArray.filter(
            (y) => y.fkParentID == c.categoryID
          );
          const category2 = {} as menuCategory;
          category2.categoryID = c.categoryID;
          category2.categoryName = c.categoryName;
          c.subsections = [...children2];
        }

        category.subsections = [...childrenItem];
        this.modifiedData.push(category);

        console.log('Modified Data Array: ', this.modifiedData);
      }
    }
  }

  hasMatchingChild(formData: menuCategory): boolean {
    return this.formDataArray.some(
      (formDataChild) => formDataChild.fkParentID == formData.categoryID
    );
  }

  // getFilteredData(parentId: number | null): menuCategory[] {
  //   return this.formDataArray.filter(x => x.fkParentID === parentId);
  // }
}
