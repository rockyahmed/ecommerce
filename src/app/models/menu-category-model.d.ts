export interface menuCategory {
  categoryName: string | null | undefined;
  categoryID: number | null | undefined;
  fkParentID?: number | undefined | '';
  subsections?:menuCategory[];
}
export interface ProductData {
  productId?: number | null;
  productTitle: string | null;
  productPrice?: number | null;
  images?: string | null;
  productDiscount?: number | null;
  productWeight?: number | null;
  productfkParentId?: number | null;
  productDescription?: string | null;
}

export interface RoleName {
  roleTypeId: number;
  roleTypeName: string;
}