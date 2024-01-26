import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormDataServiceService {

  private formDataArray: any[] = [];

  getFormDataArray(): any[] {
    return this.formDataArray;
  }

  addFormData(formData: any): void {
    // Check if category ID already exists
    const categoryIdExists = this.formDataArray.some((entry: { categoryID: any }) => entry.categoryID === formData.categoryID);

    if (!categoryIdExists) {
      this.formDataArray.push(formData);
      this.saveFormDataToLocalStorage();
    } else {
      window.alert(`Category ID ${formData.categoryID} already exists. Entry not added.`);
    }
  }

  saveFormDataToLocalStorage(): void {
    localStorage.setItem('form-data', JSON.stringify(this.formDataArray));
  }

  retrieveFormDataFromLocalStorage(): void {
    const storedData = localStorage.getItem('form-data');
    if (storedData !== null) {
      this.formDataArray = JSON.parse(storedData);
    }
  }
}
