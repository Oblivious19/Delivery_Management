// services/api-provider.service.ts
import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { DeliveryPersonService } from './delivery-person.service';
import { CustomerService } from './customer.service';
import { MockDataService } from './mock-data.service';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiProviderService {
  private useMockData = true;

  constructor(
    private orderService: OrderService,
    private deliveryPersonService: DeliveryPersonService,
    private customerService: CustomerService,
    private mockDataService: MockDataService
  ) {
    console.log('ApiProviderService initialized with mock data mode:', this.useMockData);
    if (!this.useMockData) {
      this.checkBackendAvailability();
    }
  }

  private checkBackendAvailability(): void {
    this.orderService.getAllOrders().pipe(
      map(() => false),
      catchError(() => {
        console.log('Backend server not available, using mock data');
        this.useMockData = true;
        return of(true);
      })
    ).subscribe();
  }

  // Order service methods
  getAllOrders() {
    return this.useMockData ? this.mockDataService.getAllOrders() : this.orderService.getAllOrders();
  }

  getOrderById(id: string) {
    return this.useMockData ? this.mockDataService.getOrderById(id) : this.orderService.getOrderById(id);
  }

  getCustomerOrders(customerId: string) {
    return this.useMockData ? 
      this.mockDataService.getCustomerOrders(customerId) : 
      this.orderService.getCustomerOrders(customerId);
  }

  createOrder(order: any) {
    return this.useMockData ? this.mockDataService.createOrder(order) : this.orderService.createOrder(order);
  }

  updateOrder(id: string, order: any) {
    return this.useMockData ? this.mockDataService.updateOrder(id, order) : this.orderService.updateOrder(id, order);
  }

  // Additional order service methods
  assignDeliveryPerson(orderId: string, deliveryPersonId: string) {
    if (this.useMockData) {
      return this.mockDataService.updateOrder(orderId, { deliveryPersonId });
    } else {
      return this.orderService.assignDeliveryPerson(orderId, deliveryPersonId);
    }
  }

  updateOrderStatus(orderId: string, status: string) {
    if (this.useMockData) {
      // Convert to the proper status type
      const typedStatus = status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'ASSIGNED';
      return this.mockDataService.updateOrder(orderId, { status: typedStatus });
    } else {
      return this.orderService.updateOrderStatus(orderId, status);
    }
  }

  updateDeliveryStatus(orderId: string, isDelivered: boolean) {
    if (this.useMockData) {
      const status = isDelivered ? 'COMPLETED' as const : 'IN_PROGRESS' as const;
      return this.mockDataService.updateOrder(orderId, { status });
    } else {
      if (isDelivered) {
        return this.orderService.updateOrderStatus(orderId, 'COMPLETED');
      } else {
        return this.orderService.updateOrderStatus(orderId, 'IN_PROGRESS');
      }
    }
  }

  deleteOrder(orderId: string) {
    if (this.useMockData) {
      return of({ success: true, message: 'Order deleted successfully' });
    } else {
      return this.orderService.deleteOrder(orderId);
    }
  }

  // Delivery Person service methods
  getAllDeliveryPersons() {
    return this.useMockData ? 
      this.mockDataService.getAllDeliveryPersons() : 
      this.deliveryPersonService.getAllDeliveryPersons();
  }

  getDeliveryPersonById(id: string) {
    return this.useMockData ? 
      this.mockDataService.getDeliveryPersonById(id) : 
      this.deliveryPersonService.getDeliveryPersonById(id);
  }

  // Customer service methods
  getAllCustomers() {
    return this.useMockData ? this.mockDataService.getAllCustomers() : this.customerService.getAllCustomers();
  }

  getCustomerById(id: string) {
    return this.useMockData ? this.mockDataService.getCustomerById(id) : this.customerService.getCustomerById(id);
  }

  // Getter method to check if using mock data
  get isMockDataMode(): boolean {
    return this.useMockData;
  }

  // Method to force the use of mock data (for testing)
  setMockDataMode(useMock: boolean): void {
    this.useMockData = useMock;
    console.log(`Using mock data: ${this.useMockData}`);
  }
}