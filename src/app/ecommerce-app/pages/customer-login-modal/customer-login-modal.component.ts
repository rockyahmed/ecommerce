import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer-login-modal',
  standalone: true,
  imports: [],
  templateUrl: './customer-login-modal.component.html',
  styleUrl: './customer-login-modal.component.scss'
})
export class CustomerLoginModalComponent {
  title = '';
  constructor(
    public bsModalRef: BsModalRef
  ) {

  }
}
