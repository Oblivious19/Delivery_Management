import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Order } from '../models/order.model';
import { DeliveryPerson } from '../models/delivery-person.model';
import { Customer } from '../models/customer.model';
import { ResponseMessage } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockOrders: Order[] = [
    {
      id: '1',
      orderId: 1001,
      customerId: 'cust-001',
      customerName: 'John Doe',
      deliveryAddress: '123 Main Street, Anytown, USA',
      status: 'PENDING',
      orderStatus: 'pending',
      orderDate: new Date('2023-06-01'),
      totalAmount: 35.99,
      orderAmount: 35.99,
      paymentMode: 'Credit Card',
      items: [
        { id: '1', name: 'Product 1', quantity: 2, price: 17.99, total: 35.98 }
      ],
      createdAt: new Date('2023-06-01T10:30:00')
    },
    {
      id: '2',
      orderId: 1002,
      customerId: 'cust-001',
      customerName: 'John Doe',
      deliveryPersonId: 'deliv-001',
      deliveryPersonName: 'Jane Smith',
      deliveryAddress: '123 Main Street, Anytown, USA',
      status: 'IN_PROGRESS',
      orderStatus: 'in-progress',
      orderDate: new Date('2023-06-05'),
      totalAmount: 42.50,
      orderAmount: 42.50,
      paymentMode: 'Cash',
      items: [
        { id: '2', name: 'Product 2', quantity: 1, price: 24.99, total: 24.99 },
        { id: '3', name: 'Product 3', quantity: 1, price: 17.51, total: 17.51 }
      ],
      createdAt: new Date('2023-06-05T14:15:00')
    },
    {
      id: '3',
      orderId: 1003,
      customerId: 'cust-002',
      customerName: 'Bob Johnson',
      deliveryPersonId: 'deliv-002',
      deliveryPersonName: 'Mike Wilson',
      deliveryAddress: '456 Elm Street, Othertown, USA',
      status: 'COMPLETED',
      orderStatus: 'delivered',
      orderDate: new Date('2023-06-10'),
      totalAmount: 78.25,
      orderAmount: 78.25,
      paymentMode: 'Digital Wallet',
      items: [
        { id: '4', name: 'Product 4', quantity: 3, price: 26.08, total: 78.24 }
      ],
      createdAt: new Date('2023-06-10T09:45:00')
    },
    {
      id: '4',
      orderId: 1004,
      customerId: 'cust-003',
      customerName: 'Lisa Brown',
      deliveryPersonId: 'deliv-001',
      deliveryPersonName: 'Jane Smith',
      deliveryAddress: '789 Oak Avenue, Somewhere, USA',
      status: 'COMPLETED',
      orderStatus: 'delivered',
      orderDate: new Date('2023-06-12'),
      totalAmount: 52.75,
      orderAmount: 52.75,
      paymentMode: 'Credit Card',
      items: [
        { id: '5', name: 'Product 5', quantity: 1, price: 52.75, total: 52.75 }
      ],
      createdAt: new Date('2023-06-12T11:20:00')
    },
    {
      id: '5',
      orderId: 1005,
      customerId: 'cust-004',
      customerName: 'Michael Davis',
      deliveryAddress: '321 Pine Road, Elsewhere, USA',
      status: 'PENDING',
      orderStatus: 'pending',
      orderDate: new Date('2023-06-15'),
      totalAmount: 93.45,
      orderAmount: 93.45,
      paymentMode: 'Cash',
      items: [
        { id: '6', name: 'Product 6', quantity: 2, price: 46.72, total: 93.44 }
      ],
      createdAt: new Date('2023-06-15T15:30:00')
    },
    {
      id: '6',
      orderId: 1006,
      customerId: 'cust-005',
      customerName: 'Emily Wilson',
      deliveryPersonId: 'deliv-003',
      deliveryPersonName: 'Sarah Thompson',
      deliveryAddress: '567 Maple Drive, Yourtown, USA',
      status: 'IN_PROGRESS',
      orderStatus: 'in-progress',
      orderDate: new Date('2023-06-18'),
      totalAmount: 125.99,
      orderAmount: 125.99,
      paymentMode: 'Digital Wallet',
      items: [
        { id: '7', name: 'Product 7', quantity: 1, price: 125.99, total: 125.99 }
      ],
      createdAt: new Date('2023-06-18T09:15:00')
    },
    {
      id: '7',
      orderId: 1007,
      customerId: 'cust-002',
      customerName: 'Bob Johnson',
      deliveryAddress: '456 Elm Street, Othertown, USA',
      status: 'PENDING',
      orderStatus: 'pending',
      orderDate: new Date('2023-06-20'),
      totalAmount: 67.50,
      orderAmount: 67.50,
      paymentMode: 'Credit Card',
      items: [
        { id: '8', name: 'Product 8', quantity: 3, price: 22.50, total: 67.50 }
      ],
      createdAt: new Date('2023-06-20T14:45:00')
    },
    {
      id: '8',
      orderId: 1008,
      customerId: 'cust-006',
      customerName: 'James Taylor',
      deliveryPersonId: 'deliv-004',
      deliveryPersonName: 'Robert Brown',
      deliveryAddress: '890 Cedar Lane, Thatplace, USA',
      status: 'CANCELLED',
      orderStatus: 'cancelled',
      orderDate: new Date('2023-06-22'),
      totalAmount: 43.99,
      orderAmount: 43.99,
      paymentMode: 'Cash',
      items: [
        { id: '9', name: 'Product 9', quantity: 1, price: 43.99, total: 43.99 }
      ],
      createdAt: new Date('2023-06-22T10:10:00')
    },
    {
      id: '9',
      orderId: 1009,
      customerId: 'cust-007',
      customerName: 'Sophia Martinez',
      deliveryPersonId: 'deliv-005',
      deliveryPersonName: 'David Miller',
      deliveryAddress: '432 Cherry Street, Sometown, USA',
      status: 'ASSIGNED',
      orderStatus: 'assigned',
      orderDate: new Date('2023-06-25'),
      totalAmount: 89.95,
      orderAmount: 89.95,
      paymentMode: 'Digital Wallet',
      items: [
        { id: '10', name: 'Product 10', quantity: 1, price: 89.95, total: 89.95 }
      ],
      createdAt: new Date('2023-06-25T16:20:00')
    },
    {
      id: '10',
      orderId: 1010,
      customerId: 'cust-001',
      customerName: 'John Doe',
      deliveryAddress: '123 Main Street, Anytown, USA',
      status: 'PENDING',
      orderStatus: 'pending',
      orderDate: new Date('2023-06-28'),
      totalAmount: 105.75,
      orderAmount: 105.75,
      paymentMode: 'Credit Card',
      items: [
        { id: '11', name: 'Product 11', quantity: 3, price: 35.25, total: 105.75 }
      ],
      createdAt: new Date('2023-06-28T11:45:00')
    }
  ];

  private mockDeliveryPersons: DeliveryPerson[] = [
    {
      id: 'deliv-001',
      personId: 'deliv-001',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '555-123-4567',
      personContactNumber: '555-123-4567',
      status: 'BUSY',
      personStatus: 'ASSIGNED',
      currentLocation: {
        latitude: 40.7128,
        longitude: -74.0060
      }
    },
    {
      id: 'deliv-002',
      personId: 'deliv-002',
      name: 'Mike Wilson',
      email: 'mike.wilson@example.com',
      phone: '555-987-6543',
      personContactNumber: '555-987-6543',
      status: 'AVAILABLE',
      personStatus: 'AVAILABLE',
      currentLocation: {
        latitude: 34.0522,
        longitude: -118.2437
      }
    },
    {
      id: 'deliv-003',
      personId: 'deliv-003',
      name: 'Sarah Thompson',
      email: 'sarah.thompson@example.com',
      phone: '555-456-7890',
      personContactNumber: '555-456-7890',
      status: 'BUSY',
      personStatus: 'ASSIGNED',
      currentLocation: {
        latitude: 41.8781,
        longitude: -87.6298
      }
    },
    {
      id: 'deliv-004',
      personId: 'deliv-004',
      name: 'Robert Brown',
      email: 'robert.brown@example.com',
      phone: '555-789-1234',
      personContactNumber: '555-789-1234',
      status: 'AVAILABLE',
      personStatus: 'AVAILABLE',
      currentLocation: {
        latitude: 37.7749,
        longitude: -122.4194
      }
    },
    {
      id: 'deliv-005',
      personId: 'deliv-005',
      name: 'David Miller',
      email: 'david.miller@example.com',
      phone: '555-234-5678',
      personContactNumber: '555-234-5678',
      status: 'BUSY',
      personStatus: 'ASSIGNED',
      currentLocation: {
        latitude: 39.9526,
        longitude: -75.1652
      }
    },
    {
      id: 'deliv-006',
      personId: 'deliv-006',
      name: 'Emma Wilson',
      email: 'emma.wilson@example.com',
      phone: '555-345-6789',
      personContactNumber: '555-345-6789',
      status: 'OFFLINE',
      personStatus: 'UNAVAILABLE',
      currentLocation: {
        latitude: 29.7604,
        longitude: -95.3698
      }
    },
    {
      id: 'deliv-007',
      personId: 'deliv-007',
      name: 'Daniel Garcia',
      email: 'daniel.garcia@example.com',
      phone: '555-456-7891',
      personContactNumber: '555-456-7891',
      status: 'AVAILABLE',
      personStatus: 'AVAILABLE',
      currentLocation: {
        latitude: 33.4484,
        longitude: -112.0740
      }
    }
  ];

  private mockCustomers: Customer[] = [
    {
      id: 'cust-001',
      customerId: 'cust-001',
      name: 'John Doe',
      customerName: 'John Doe',
      email: 'john.doe@example.com',
      customerEmail: 'john.doe@example.com',
      phone: '555-111-2222',
      address: '123 Main Street, Anytown, USA',
      customerAddress: '123 Main Street, Anytown, USA'
    },
    {
      id: 'cust-002',
      customerId: 'cust-002',
      name: 'Bob Johnson',
      customerName: 'Bob Johnson',
      email: 'bob.johnson@example.com',
      customerEmail: 'bob.johnson@example.com',
      phone: '555-333-4444',
      address: '456 Elm Street, Othertown, USA',
      customerAddress: '456 Elm Street, Othertown, USA'
    },
    {
      id: 'cust-003',
      customerId: 'cust-003',
      name: 'Lisa Brown',
      customerName: 'Lisa Brown',
      email: 'lisa.brown@example.com',
      customerEmail: 'lisa.brown@example.com',
      phone: '555-555-6666',
      address: '789 Oak Avenue, Somewhere, USA',
      customerAddress: '789 Oak Avenue, Somewhere, USA'
    },
    {
      id: 'cust-004',
      customerId: 'cust-004',
      name: 'Michael Davis',
      customerName: 'Michael Davis',
      email: 'michael.davis@example.com',
      customerEmail: 'michael.davis@example.com',
      phone: '555-777-8888',
      address: '321 Pine Road, Elsewhere, USA',
      customerAddress: '321 Pine Road, Elsewhere, USA'
    },
    {
      id: 'cust-005',
      customerId: 'cust-005',
      name: 'Emily Wilson',
      customerName: 'Emily Wilson',
      email: 'emily.wilson@example.com',
      customerEmail: 'emily.wilson@example.com',
      phone: '555-999-0000',
      address: '567 Maple Drive, Yourtown, USA',
      customerAddress: '567 Maple Drive, Yourtown, USA'
    },
    {
      id: 'cust-006',
      customerId: 'cust-006',
      name: 'James Taylor',
      customerName: 'James Taylor',
      email: 'james.taylor@example.com',
      customerEmail: 'james.taylor@example.com',
      phone: '555-222-3333',
      address: '890 Cedar Lane, Thatplace, USA',
      customerAddress: '890 Cedar Lane, Thatplace, USA'
    },
    {
      id: 'cust-007',
      customerId: 'cust-007',
      name: 'Sophia Martinez',
      customerName: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      customerEmail: 'sophia.martinez@example.com',
      phone: '555-444-5555',
      address: '432 Cherry Street, Sometown, USA',
      customerAddress: '432 Cherry Street, Sometown, USA'
    },
    {
      id: 'cust-008',
      customerId: 'cust-008',
      name: 'William Anderson',
      customerName: 'William Anderson',
      email: 'william.anderson@example.com',
      customerEmail: 'william.anderson@example.com',
      phone: '555-666-7777',
      address: '765 Birch Boulevard, Anothercity, USA',
      customerAddress: '765 Birch Boulevard, Anothercity, USA'
    }
  ];

  constructor() { 
    console.log('MockDataService initialized');
  }

  // Order mock methods
  getAllOrders(): Observable<Order[]> {
    console.log('Returning mock orders');
    return of([...this.mockOrders]);
  }

  getOrderById(id: string): Observable<Order> {
    const order = this.mockOrders.find(o => o.id === id);
    return of(order ? {...order} : null as any);
  }

  getCustomerOrders(customerId: string): Observable<Order[]> {
    const orders = this.mockOrders.filter(o => o.customerId === customerId);
    return of([...orders]);
  }

  createOrder(order: any): Observable<ResponseMessage> {
    const newId = (Math.max(...this.mockOrders.map(o => parseInt(o.id))) + 1).toString();
    const newOrderId = Math.max(...this.mockOrders.map(o => o.orderId || 0)) + 1;
    
    const newOrder = {
      ...order,
      id: newId,
      orderId: newOrderId,
      status: 'PENDING',
      orderStatus: 'pending',
      createdAt: new Date()
    };
    
    this.mockOrders.push(newOrder as Order);
    return of({ success: true, message: 'Order created successfully' });
  }

  updateOrder(id: string, orderUpdate: Partial<Order>): Observable<ResponseMessage> {
    const index = this.mockOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      // Update the order with new values
      this.mockOrders[index] = {
        ...this.mockOrders[index],
        ...orderUpdate
      };
      
      // If delivery person is being assigned, update related fields
      if (orderUpdate.deliveryPersonId) {
        const deliveryPerson = this.mockDeliveryPersons.find(dp => dp.id === orderUpdate.deliveryPersonId);
        if (deliveryPerson) {
          this.mockOrders[index].deliveryPersonName = deliveryPerson.name;
          this.mockOrders[index].status = 'IN_PROGRESS';
          this.mockOrders[index].orderStatus = 'in-progress';
        }
      }
      
      // If status is being updated, sync status fields
      if (orderUpdate.status) {
        this.mockOrders[index].status = orderUpdate.status;
        switch (orderUpdate.status) {
          case 'PENDING':
            this.mockOrders[index].orderStatus = 'pending';
            break;
          case 'IN_PROGRESS':
            this.mockOrders[index].orderStatus = 'in-progress';
            break;
          case 'COMPLETED':
            this.mockOrders[index].orderStatus = 'delivered';
            break;
          case 'CANCELLED':
            this.mockOrders[index].orderStatus = 'cancelled';
            break;
          case 'ASSIGNED':
            this.mockOrders[index].orderStatus = 'assigned';
            break;
        }
      }
      
      return of({ success: true, message: 'Order updated successfully' });
    }
    
    return of({ success: false, message: 'Order not found' });
  }

  deleteOrder(id: string): Observable<ResponseMessage> {
    const index = this.mockOrders.findIndex(o => o.id === id);
    if (index !== -1) {
      this.mockOrders.splice(index, 1);
      return of({ success: true, message: 'Order deleted successfully' });
    }
    return of({ success: false, message: 'Order not found' });
  }

  // Delivery Person mock methods
  getAllDeliveryPersons(): Observable<DeliveryPerson[]> {
    console.log('Returning mock delivery persons');
    return of([...this.mockDeliveryPersons]);
  }

  getDeliveryPersonById(id: string): Observable<DeliveryPerson> {
    const person = this.mockDeliveryPersons.find(p => p.id === id);
    return of(person ? {...person} : null as any);
  }

  // Customer mock methods
  getAllCustomers(): Observable<Customer[]> {
    console.log('Returning mock customers');
    return of([...this.mockCustomers]);
  }

  getCustomerById(id: string): Observable<Customer> {
    const customer = this.mockCustomers.find(c => c.id === id);
    return of(customer ? {...customer} : null as any);
  }
} 