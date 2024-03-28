import { Component, OnInit } from '@angular/core';
import {
  CustomerLogin,
  Invoice,
  Payment,
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
      transitionNumber: ['', Validators.required]
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
      if(element.productPrice !== null && element.productDiscount !== null) {
        const discountAmountTotal = (element.productPrice * element.quantity) * (element.productDiscount / 100);
        const totalPrice = (element.productPrice * element.quantity) - discountAmountTotal;
        const singleDiscount = (element.productPrice * element.productDiscount) / 100;
        const unitPriceCalculation = element.productPrice - singleDiscount;
        
        const newWorkOrderDetails: WorkOrderDetails = {
          id: this.getWorkOrdeDetailsId() + 1,
          fkworkOrderId: newWorkOrder.workOrderId,
          fkProductId: element.productId || 0,
          unitPrice: unitPriceCalculation,
          quantity: element.quantity,
          total: totalPrice,
          discount: element.productDiscount,
          discountAmount: discountAmountTotal
        }
        let workOrderDetailsArray: WorkOrderDetails[] = JSON.parse(
          localStorage.getItem('workOrderDetails') || '[]'
        );
    
        // Add the new WorkOrders object to the array
        workOrderDetailsArray.push(newWorkOrderDetails);
        localStorage.setItem('workOrderDetails', JSON.stringify(workOrderDetailsArray));
      } else {
        console.error('Product price and discount is null for element:', element);
      }
    });

    // Invoice
    const newInvoice: Invoice = {
      id: this.getWorkOrdeDetailsId() + 1,
      invoiceNo: `INID-00${this.getInvoiceId() + 1}`,
      fkworkOrderId: newWorkOrder.workOrderId,
    }

    let InvoiceArray: Invoice[] = JSON.parse(
      localStorage.getItem('Invoice') || '[]'
    );

    InvoiceArray.push(newInvoice);

    localStorage.setItem('Invoice', JSON.stringify(InvoiceArray));


    // Payment Info
    const newPayment: Payment = {
      id: this.getPaymentId() + 1,
      receiptNo: `0000${this.getPaymentId() + 1}`,
      fkworkOrderId: newWorkOrder.workOrderId,
      fkInvoiceId: newInvoice.id,
      transectionId: this.confirmOrder.transitionNumber,
    }

    let PaymentArray: Payment[] = JSON.parse(
      localStorage.getItem('Payment') || '[]'
    )

    PaymentArray.push(newPayment);

    localStorage.setItem('Payment', JSON.stringify(PaymentArray));

    

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
  public getInvoiceId() {
    const invoiceData = localStorage.getItem('Invoice');
    if (invoiceData !== null) {
      const invoice = JSON.parse(invoiceData);
      return invoice[invoice?.length - 1].invoiceNo;
    }
    return 0;
  }
  public getPaymentId() {
    const paymentData = localStorage.getItem('Payment');
    if (paymentData !== null) {
      const payment = JSON.parse(paymentData);
      return payment[payment?.length - 1].id;
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

  isInputRequired(): boolean {
    // Check if input field is required based on the selected payment method
    const transitionNumber = this.deliveryForm.get('customerPayment')?.value;
    return transitionNumber === '1' || transitionNumber === '2'; // Show input for both payment methods
  }


  onPaymentMethodChange(transitionNumber: number){

  }

}
