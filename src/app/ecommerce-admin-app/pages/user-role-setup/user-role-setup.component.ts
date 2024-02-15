import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RoleName } from '../../../models/menu-category-model';

@Component({
  selector: 'app-user-role-setup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-role-setup.component.html',
  styleUrl: './user-role-setup.component.scss',
})
export class UserRoleSetupComponent {
  roleType: FormGroup;

  roles: Array<RoleName> = [];

  constructor(private fb: FormBuilder) {
    this.roleType = this.fb.group({
      roleTypeId: ['', Validators.required],
      roleTypeName: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.roleType.get('roleTypeId')?.setValue(this.getNextRoleId());
  }

  onSubmit() {
    console.log(this.roleType.value);

    const formData = this.roleType.value;
    this.roles.push(formData);

    localStorage.setItem('roles', JSON.stringify(this.roles));

    this.roleType.reset();
    this.roleType.get('roleTypeId')?.setValue(this.getNextRoleId());
  }

  private getNextRoleId(): number {
    const storedData = localStorage.getItem('roles');
    if (storedData !== null) {
      const roleList = JSON.parse(storedData);
      return roleList[roleList?.length - 1].roleTypeId + 1
    }

    return 0;
  }
  
}
