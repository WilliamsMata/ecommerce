import { Gender, Size } from "@prisma/client";

export interface IOrder {
  id?: string;
  orderItems: IOrderItem[];
  shippingAddress: IShippingAddress;
  paymentResult?: string;

  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  isPaid: boolean;
  paidAt?: Date;
}

export interface IOrderItem {
  productId: string;
  size: Size;
  gender: Gender;
  quantity: number;
  price: number;
}

export interface IShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  state: string;
  country: string;
  phone: string;
}
