// services/order.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { ResponseMessage } from '../models/response.model';
import { DeliveryPerson } from '../models/delivery-person.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) { }

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orders/${orderId}`);
  }

  getCustomerOrders(customerId: string): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/customers/${customerId}/orders`);
  }

  createOrder(order: Order): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/orders`, order);
  }

  updateOrder(orderId: number, orderUpdate: any): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${this.baseUrl}/orders/${orderId}`, orderUpdate);
  }

  deleteOrder(orderId: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${this.baseUrl}/orders/${orderId}`);
  }

  updateDeliveryStatus(orderId: number, delivered: boolean): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${this.baseUrl}/orders/${orderId}/delivery-status`, { delivered });
  }

  getAvailableDeliveryPersons(): Observable<DeliveryPerson[]> {
    return this.http.get<DeliveryPerson[]>(`${this.baseUrl}/orders/available-delivery-persons`);
  }
}