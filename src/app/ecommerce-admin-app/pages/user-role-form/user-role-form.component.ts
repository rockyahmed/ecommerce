import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleName, UsersRoleForm } from '../../../models/menu-category-model';

@Component({
  selector: 'app-user-role-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-role-form.component.html',
  styleUrl: './user-role-form.component.scss',
})
export class UserRoleFormComponent {
  fkRoleTypeArray: Array<RoleName> = [];

  UsersRoleFormArray: Array<UsersRoleForm> = [];

  userRoleForm = this.fb.group({
    userRoleId: ['', Validators.required],
    name: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$'),
      ],
    ],
    phone: ['', Validators.required],
    fkroleType: ['', Validators.required],
    roleStatus: [false, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const storedData = localStorage.getItem('roles');
    if (storedData !== null) {
      this.fkRoleTypeArray = JSON.parse(storedData);
    }
  }

  onSubmit() {
    console.log(this.userRoleForm.controls.roleStatus);

    const usersRoleFormData = this.userRoleForm.value as UsersRoleForm;
    this.UsersRoleFormArray.push(usersRoleFormData)

    localStorage.setItem(
      'user-role-form',
      JSON.stringify(this.UsersRoleFormArray)
    );

    this.userRoleForm.reset();
  }
}
