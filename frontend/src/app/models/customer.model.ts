// models/customer.model.ts
export interface Customer {
    customerId: string;
    customerName: string;
    customerEmail: string;
    customerPassword?: string;
    customerAddress: string;
  }
  