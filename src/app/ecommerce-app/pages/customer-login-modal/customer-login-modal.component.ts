import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CustomerLogin, UserLogin } from '../../../models/menu-category-model';

@Component({
  selector: 'app-customer-login-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-login-modal.component.html',
  styleUrl: './customer-login-modal.component.scss',
})
export class CustomerLoginModalComponent implements OnInit {
  title = '';
  loginRegister: boolean = false;

  loginForm!: FormGroup;
  customerLoginForm!: FormGroup;

  customerLogin: CustomerLogin[] = [];

  loginFormOB: UserLogin | undefined;

  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder) {}

  ngOnInit(): void {
    
    const strCustomerLoginData = localStorage.getItem('customers-list');

    if (strCustomerLoginData !== null) {
      this.customerLogin = JSON.parse(strCustomerLoginData);
      
    }

    this.createLoginForm();
    this.customerForm();

    this.customerLoginForm.get('customerId')?.setValue(this.getCustomerId() + 1);
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
          ),
        ],
      ],
    });
  }

  customerForm() {
    this.customerLoginForm = this.fb.group({
      customerId: ['', Validators.required],
      customerName: ['', Validators.required],
      customerEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
        ],
      ],
      customerPassword: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
          ),
        ],
      ],
      confirmPassword: [''],
      customerNumber: ['', Validators.required],
      customerAddress: ['', Validators.required],
    });
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    const loginData = this.loginForm.value as UserLogin;

    const existingCustomer = this.customerLogin.find(
      (entry: CustomerLogin) => entry.customerEmail === loginData.email
    );

    if (existingCustomer) {
      if (existingCustomer.customerPassword === loginData.password) {
        localStorage.setItem(
          'logged-in-user',
          JSON.stringify(existingCustomer)
        );
        console.log('Login Successful');
      } else {
        window.alert('Incorrect Password, Please try again.');
      }
    } else {
      window.alert('Email Not Found, Please sign up');
    }
  }
  customerOnSubmit() {
    debugger
    const customerLoginData = this.customerLoginForm.value as CustomerLogin;

    const existingCustomerInfo = this.customerLogin.find(
      (item) => item.customerEmail === customerLoginData.customerEmail
    );

    if (existingCustomerInfo) {
      window.alert('Email Already exists');
    } else {
      
      this.customerLogin.push(customerLoginData);

      localStorage.setItem(
        'customers-list',
        JSON.stringify(this.customerLogin)
      );
      this.customerLoginForm.get('customerId')?.setValue(this.getCustomerId() + 1);

      

      // Toggle any flag or variable indicating the state of your login/register interface
      this.loginRegister = !this.loginRegister;
    }
  }

  registerForm() {
    this.loginRegister = !this.loginRegister;
  }
  public getCustomerId() {
    const customerLoginData = localStorage.getItem('customers-list');
    if (customerLoginData !== null) {
      const customerLogin = JSON.parse(customerLoginData);
      return customerLogin[customerLogin?.length - 1].customerId;
    }
    return 0;
  }
}
