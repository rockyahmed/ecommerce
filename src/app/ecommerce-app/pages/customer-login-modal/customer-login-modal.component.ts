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
    const strCustomerLoginData = localStorage.getItem('customer-login');

    if (strCustomerLoginData !== null) {
      this.customerLogin = JSON.parse(strCustomerLoginData);
    }

    this.createLoginForm();
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
      confirmPassword:[''],
      customerNumber: ['', Validators.required],
      CustomerAddress: ['', Validators.required]
    })
  }

  onSubmit() {
    // console.log(this.loginForm.value);
    const loginData = this.loginForm.value as UserLogin;

    const existingCustomer = this.customerLogin.find(
      (entry: CustomerLogin) => entry.customerEmail === loginData.email
    );

    if (existingCustomer) {
      if(existingCustomer.customerPassword === loginData.password){
        localStorage.setItem('logged-in-user', JSON.stringify(existingCustomer));
        console.log('Login Successful')
      } else {
        window.alert('Incorrect Password, Please try again.')
      }
    } else {
      window.alert('Email Not Found, Please sign up')
    }
  }
  customerOnSubmit() {
    console.log(this.customerLoginForm.value)
  }

  registerForm() {
    this.loginRegister = !this.loginRegister;
  }
}
