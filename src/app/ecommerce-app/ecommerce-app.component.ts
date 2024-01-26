import { Component, OnInit } from '@angular/core';
import { FormDataServiceService } from '../service/form-data-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ecommerce-app',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ecommerce-app.component.html',
  styleUrl: './ecommerce-app.component.scss'
})
export class EcommerceAppComponent implements OnInit {

  // formDataArray: any[] | undefined;

  formDataArray: any[] = [];

  constructor(public formDataService: FormDataServiceService) {}

  ngOnInit() {
    // this.formDataService.retrieveFormDataFromLocalStorage();
    // this.formDataArray = this.formDataService.getFormDataArray();

    console.log(this.formDataArray)

    const storedData = localStorage.getItem('form-data');

    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    }
  }
}
