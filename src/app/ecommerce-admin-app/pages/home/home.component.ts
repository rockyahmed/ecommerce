import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FormDataServiceService } from '../../../service/form-data-service.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  menuCreateForm = this.formBuilder.group({
    categoryName: ['', Validators.required],
    categoryID: ['', Validators.required],
  });

  formDataArray: any[] = [];

  constructor(
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit() {
    // this.formDataService.retrieveFormDataFromLocalStorage();
    // this.formDataArray = this.formDataService.getFormDataArray();

    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    }
  }

  onSubmit() {
    console.log(this.formDataArray);

    // this.formDataService.addFormData(this.menuCreateForm.value);
    // this.formDataService.saveFormDataToLocalStorage();

    // this.menuCreateForm.reset();

    const formData = this.menuCreateForm.value;

    const categoryIdExists = this.formDataArray.some(
      (entry: { categoryID: any }) => entry.categoryID === formData.categoryID
    );

    if (categoryIdExists) {
      window.alert(`Category ID ${formData.categoryID} already exists. Entry again not Possible.`);
    } else {
      this.formDataArray.push(this.menuCreateForm.value);

      // Save updated form data array to localStorage
      localStorage.setItem('form-data', JSON.stringify(this.formDataArray));

      // Reset the form after submission
      this.menuCreateForm.reset();
    }
  }

  get getForms() {
    console.log('helloo')
    return this.menuCreateForm.controls;
  }
}
