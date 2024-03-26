export interface menuCategory {
  categoryName: string | null | undefined;
  categoryID: number | null | undefined;
  fkParentID?: number | undefined | '';
  subsections?:menuCategory[];
}
export interface ProductData {
  productId: number | null;
  productTitle: string | null;
  productPrice: number | null;
  images?: string | null;
  productDiscount: number | null;
  productWeight: number | null;
  productfkParentId: number | null;
  productDescription: string | null;
  quantity: number;
}

export interface RoleName {
  roleTypeId: number;
  roleTypeName: string;
}

export interface UsersRoleForm {
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: number;
  userRoleType: string;
  userRStatus: boolean;
}

export interface CategoryGroupProduct {
  categoryId: number;
  categoryName: string;
  products: Array<ProductData>
}
export interface UserLogin {
  userId: number;
  email: string;
  password: string;
}
export interface CustomerLogin {
  customerId: number;
  customerName: string;
  customerEmail: string;
  customerPassword: string;
  customerConfirmPassword: string;
  customerNumber: number;
  customerAddress: string;
  deliveryAddress: string;
  customerPayment: number;
  products: Array<ProductData>
}

export interface WorkOrders{
  workOrderId: number;
  workOrderNo?: string;
  workOrderAmount: number;
  fkPaymentId?: number;
  paymentType?: number;
  orderStatus?: number;
  fkCustomerId: number;
}
export interface WorkOrderDetails{
  id: number;
  fkworkOrderId?: number;
  workOrderNo?: string;
  unitPrice?: number;
  quantity?: number;
  total?: number;
  discount?: number;
  discountAmount?: number;
}