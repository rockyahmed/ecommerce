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

  formDataArray: any;

  constructor(
    private formBuilder: FormBuilder,
    public formDataService: FormDataServiceService
  ) { }

  ngOnInit() {
    this.formDataService.retrieveFormDataFromLocalStorage();
    this.formDataArray = this.formDataService.getFormDataArray();
  }

  onSubmit() {
    console.log(this.menuCreateForm.value);

    this.formDataService.addFormData(this.menuCreateForm.value);
    this.formDataService.saveFormDataToLocalStorage();

    this.menuCreateForm.reset();
  }

  get getForms() {
    return this.menuCreateForm.controls;
  }
}
