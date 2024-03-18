import { Component, OnInit } from '@angular/core';
import { ProductData } from '../../../models/menu-category-model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {

  cartProductList: Array<ProductData> = [];

  // loginFormOB: UserLogin | undefined;

  deliveryForm!: FormGroup;

  constructor(public fb: FormBuilder) {

  }

  ngOnInit(): void {
    const storedData = localStorage.getItem('cart');
    if (storedData !== null) {
      this.cartProductList = JSON.parse(storedData);
    }

    const strLoginInData = localStorage.getItem('logged-in-user');

    if (strLoginInData !== null) {
      // this.loginFormOB = JSON.parse(strLoginInData);
      
    }



    this.createDeliveryForm();


  }

  createDeliveryForm() {
    this.deliveryForm = this.fb.group({
      deliveryAddress: ['', Validators.required],
      customerName: ['', Validators.required],
      customerEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      customerNumber: ['', Validators.required],
      customerAddress: ['', Validators.required],
    });
  }

  listenValueChanges(){
    // this.deliveryForm.patchValue({
    //   customerName: this.loginFormOB.Cus
    // });
  }

  onSubmit(){

  }

}
