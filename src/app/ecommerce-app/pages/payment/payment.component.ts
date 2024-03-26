import { Component, OnInit } from '@angular/core';
import {
  CustomerLogin,
  ProductData,
  WorkOrderDetails,
  WorkOrders,
} from '../../../models/menu-category-model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PaymentType } from '../../../enums/order.enum';

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

  paymentType: typeof PaymentType | undefined;

  constructor(public fb: FormBuilder) {}

  ngOnInit(): void {
    this.paymentType = PaymentType;
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
    // this.deliveryForm
    //   .get('id')
    //   ?.setValue(this.getDeliveryOrderId() + 1);

    

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
      customerPayment: ['', Validators.required],
    });
  }

  listenValueChanges() {
    this.deliveryForm.patchValue({
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
    // this.deliveryForm
    //   .get('id')
    //   ?.setValue(this.getDeliveryOrderId() + 1);

    // WorkOrders
    const totalAmount: number = this.cartProductList.reduce(
      (total, product) => {
        const discountedSubtotal = this.calculateDiscountedSubtotal(product);
        return total + discountedSubtotal;
      },
      0
    );

    const newWorkOrder: WorkOrders = {
      workOrderId: this.getWorkOrderId() + 1,
      workOrderNo: `WD-00${this.getWorkOrderId() + 1}`,
      workOrderAmount: totalAmount,
      paymentType:
        this.confirmOrder.customerPayment === 1
          ? this.paymentType?.Cash
          : this.paymentType?.Bekash,
      orderStatus: 1,
      fkCustomerId: this.loginFormOB?.customerId ?? 0,
    };

    // Get existing WorkOrders array from localStorage or create an empty array
    let workOrdersArray: WorkOrders[] = JSON.parse(
      localStorage.getItem('workOrders') || '[]'
    );

    // Add the new WorkOrders object to the array
    workOrdersArray.push(newWorkOrder);

    // Store the updated array in localStorage
    localStorage.setItem('workOrders', JSON.stringify(workOrdersArray));

    // WorkOrderDetails

    

    this.confirmOrder.products.forEach(element => {
      const newWorkOrderDetails: WorkOrderDetails = {
        id: this.getWorkOrdeDetailsId() + 1,
      }
      let workOrderDetailsArray: WorkOrderDetails[] = JSON.parse(
        localStorage.getItem('workOrderDetails') || '[]'
      );
  
      // Add the new WorkOrders object to the array
      workOrderDetailsArray.push(newWorkOrderDetails);
      localStorage.setItem('workOrderDetails', JSON.stringify(workOrderDetailsArray));
    });

    

    // Store the updated array in localStorage
   

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
      return confirmOrder.id;
    }
    return 0;
  }
  public getWorkOrderId() {
    const workOrderData = localStorage.getItem('workOrders');
    if (workOrderData !== null) {
      const workOrder = JSON.parse(workOrderData);
      return workOrder[workOrder?.length - 1].workOrderId;
    }
    return 0;
  }
  public getWorkOrdeDetailsId() {
    const workOrderData = localStorage.getItem('workOrderDetails');
    if (workOrderData !== null) {
      const workOrder = JSON.parse(workOrderData);
      return workOrder[workOrder?.length - 1].id;
    }
    return 0;
  }

}
