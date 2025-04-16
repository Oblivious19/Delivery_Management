// models/order.model.ts
export interface Order {
    orderId: number;
    customerId: string;
    orderAmount: number;
    orderDate: string;
    orderStatus: string;
    paymentMode: string;
    deliveryPersonId?: string;
    customerName?: string;
    deliveryPersonName?: string;
  }