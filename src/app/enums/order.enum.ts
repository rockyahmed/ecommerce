export enum OrderStatus {
  PaymentPending = 1,
  Processing = 2,
  Shipped = 3,
  Delivered = 4,
}

export enum PaymentType {
  Cash = 1,
  Bekash = 2,
}
export enum InvoiceType {
  Due = 1,
  Received = 2,
}