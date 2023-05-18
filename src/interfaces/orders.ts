import {
  Gender,
  Order,
  OrderItem,
  ShippingAddress,
  Size,
} from "@prisma/client";

export interface OrderBody {
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
  title: string;
  slug: string;
  image: string;
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

export interface CompleteOrder extends Order {
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
}

export interface OrderHistory {
  id: string;
  paid: boolean;
  fullName: string;
}
