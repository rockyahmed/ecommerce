import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { childItems, menuCategory } from '../../../models/menu-category-model';

@Component({
  selector: 'app-menu-category-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './menu-category-form.component.html',
  styleUrl: './menu-category-form.component.scss',
})
export class MenuCategoryFormComponent {
  menuCreateForm = this.formBuilder.group({
    categoryName: ['', Validators.required],
    categoryID: ['', Validators.required],
    fkParentID: ['',]
  });

  formDataArray: Array<menuCategory> = [];
  subsections: Array<menuCategory> = []

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    }
  }

  // onSubmit() {
  //   console.log(this.formDataArray);

  //   const formData = this.menuCreateForm.value;

  //   const categoryIdExists = this.formDataArray.some(
  //     (entry: menuCategory) => entry.categoryID === formData.categoryID
  //   );

    

  //   if (categoryIdExists) {
  //     window.alert(
  //       `Category ID ${formData.categoryID} already exists. Entry again not Possible.`
  //     );
  //   } else {
  //     const formData = this.menuCreateForm.value as menuCategory;
  //     this.formDataArray.push(formData);

  //     localStorage.setItem('form-data', JSON.stringify(this.formDataArray));
      

  //     this.menuCreateForm.reset();
  //   }
  // }

  onSubmit() {
    console.log(this.formDataArray);
    console.log(this.subsections);
  
    const formData = this.menuCreateForm.value as menuCategory;
  
    const categoryIdExists = this.formDataArray.some(
      (entry: menuCategory) => entry.categoryID === formData.categoryID
    );
  
    if (categoryIdExists) {
      window.alert(
        `Category ID ${formData.categoryID} already exists. Entry again not possible.`
      );
    } else {
      this.formDataArray.push(formData);
  
      // Find items in formDataArray where categoryID matches fkParentID
      const matchingSubsections = this.formDataArray.filter(
        (entry: menuCategory) => entry.categoryID === formData.fkParentID
      );
  
      // Add the matching subsections to the subsections array
      this.subsections.push(...matchingSubsections);
  
      localStorage.setItem('form-data', JSON.stringify(this.formDataArray));
  
      this.menuCreateForm.reset();
    }
  }
  
  
  


}