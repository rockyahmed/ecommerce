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
  styleUrl: './ecommerce-app.component.scss'
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
  emptyfkid: Array<menuCategory> = [];
  havefkid: Array<menuCategory> = [];

  constructor() {}

  ngOnInit() {

    console.log(this.formDataArray)

    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);

      this.emptyfkid = this.formDataArray.filter(item => item.fkParentID === null);

      this.havefkid = this.formDataArray.filter(x => x.categoryID === x.fkParentID);
      console.log(this.havefkid, 'empty fk id');
    }
    
  }

  hasMatchingChild(formData: menuCategory): boolean {
    return this.formDataArray.some(formDataChild => formDataChild.fkParentID == formData.categoryID);
  }
}
