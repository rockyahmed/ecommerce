import { Component, OnInit } from '@angular/core';
import {
  CustomerLogin,
  ProductData,
  WorkOrders,
} from '../../../models/menu-category-model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
})
export class PaymentComponent implements OnInit {
  submitted: boolean = false;
  cartProductList: Array<ProductData> = [];

  loginFormOB: CustomerLogin | undefined;

  deliveryForm!: FormGroup;

  confirmOrder: CustomerLogin | undefined;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    const storedData = localStorage.getItem('cart');
    if (storedData !== null) {
      this.cartProductList = JSON.parse(storedData);
    }

    const strLoginInData = localStorage.getItem('logged-in-user');

    if (strLoginInData !== null) {
      this.loginFormOB = JSON.parse(strLoginInData);
    }

    this.createDeliveryForm();
    this.listenValueChanges();

    const confirmOrderData = localStorage.getItem('confirmOrder');
    if (confirmOrderData !== null) {
      // Parse the JSON string back into an object
      this.confirmOrder = JSON.parse(confirmOrderData);
    }
    this.deliveryForm
      .get('deliveryOrderId')
      ?.setValue(this.getDeliveryOrderId() + 1);
  }

  createDeliveryForm() {
    this.deliveryForm = this.fb.group({
      // deliveryOrderId: ['', Validators.required],
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

  listenValueChanges() {
    this.deliveryForm.setValue({
      // deliveryOrderId: '',
      deliveryAddress: '',
      customerName: this.loginFormOB?.customerName,
      customerEmail: this.loginFormOB?.customerEmail,
      customerNumber: this.loginFormOB?.customerNumber,
      customerAddress: this.loginFormOB?.customerAddress,
    });
  }

  onSubmit() {
    console.log(this.deliveryForm.value);

    this.confirmOrder = this.deliveryForm.value as CustomerLogin;
    this.confirmOrder.products = [...this.cartProductList];
    localStorage.setItem('confirmOrder', JSON.stringify(this.confirmOrder));
    this.deliveryForm
      .get('deliveryOrderId')
      ?.setValue(this.getDeliveryOrderId() + 1);

    // WorkOrders
    const totalAmount: number = this.cartProductList.reduce(
      (total, product) => {
        const discountedSubtotal = this.calculateDiscountedSubtotal(product);
        return total + discountedSubtotal;
      },
      0
    );

    // Generate a work order number
    const workOrderNo: string = this.generateWorkOrderNo();

    const newWorkOrder: WorkOrders = {
      // workOrderId: this.getWorkOrderId(), // You should define a function to generate a unique ID
        workOrderNo: workOrderNo,
      workOrderAmount: totalAmount,
    };

    // Get existing WorkOrders array from localStorage or create an empty array
    let workOrdersArray: WorkOrders[] = JSON.parse(
      localStorage.getItem('workOrders') || '[]'
    );

    // Add the new WorkOrders object to the array
    workOrdersArray.push(newWorkOrder);

    // Store the updated array in localStorage
    localStorage.setItem('workOrders', JSON.stringify(workOrdersArray));

    this.submitted = true;
  }

  calculateDiscountedSubtotal(product: ProductData): number {
    const price = product.productPrice ?? 0;
    const quantity = product.quantity ?? 0;
    const discount = product.productDiscount ?? 0;

    const subtotal = price * quantity;
    const discountedSubtotal = subtotal - (subtotal * discount) / 100;

    return discountedSubtotal;
  }

  public getDeliveryOrderId() {
    const confirmOrderData = localStorage.getItem('confirmOrder');
    if (confirmOrderData !== null) {
      const confirmOrder = JSON.parse(confirmOrderData);
      return confirmOrder[confirmOrder?.length - 1].deliveryOrderId;
    }
    return 0;
  }

  generateWorkOrderNo(): string {
    // You can implement a logic here to generate sequential work order numbers
    // For simplicity, let's assume the latest work order number is stored in localStorage
    let latestWorkOrderNo = localStorage.getItem('latestWorkOrderNo');
    let nextWorkOrderNo = 1;

    if (latestWorkOrderNo) {
        nextWorkOrderNo = parseInt(latestWorkOrderNo.split('-')[1]) + 1;
    }

    const paddedNextWorkOrderNo = nextWorkOrderNo.toString().padStart(3, '0');
    const workOrderNo = `WD-${paddedNextWorkOrderNo}`;

    // Update the latest work order number in localStorage
    localStorage.setItem('latestWorkOrderNo', workOrderNo);

    return workOrderNo;
}
}
