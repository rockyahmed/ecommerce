import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { menuCategory } from '../../../models/menu-category-model';

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
    fkParentID: [null]
  });

  formDataArray: Array<menuCategory> = [];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    }
  }

  onSubmit() {
    console.log(this.formDataArray);
  
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
  
      // Add the matching subsections to the subsections array
  
      localStorage.setItem('form-data', JSON.stringify(this.formDataArray));
  
      this.menuCreateForm.reset();
    }
  }
}
