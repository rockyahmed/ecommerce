import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

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
  

  constructor(public bsModalRef: BsModalRef, public fb: FormBuilder) {}

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginForm = this.fb.group({
      email: [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
      password: [
        Validators.required,
        Validators.pattern(
          '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}'
        ),
      ],
    });
  }

  onSubmit(){
    console.log(this.loginForm.value)
  }

  registerForm() {
    this.loginRegister = !this.loginRegister;
  }
}
