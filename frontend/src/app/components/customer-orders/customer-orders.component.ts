// components/customer-orders/customer-orders.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-customer-orders',
  templateUrl: './customer-orders.component.html',
  styleUrls: ['./customer-orders.component.css']
})
export class CustomerOrdersComponent implements OnInit {
  orders: Order[] = [];
  isLoading = true;
  errorMessage = '';
  customerId: string | null = null;
  selectedOrder: Order | null = null;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId();
    if (this.customerId) {
      this.loadOrders();
    } else {
      this.errorMessage = 'Customer ID not found.';
      this.isLoading = false;
    }
  }

  loadOrders(): void {
    if (!this.customerId) return;

    this.isLoading = true;
    this.orderService.getCustomerOrders(this.customerId).subscribe({
      next: (data) => {
        this.orders = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load orders.';
        this.isLoading = false;
        console.error('Error loading orders:', error);
      }
    });
  }

  confirmDelivery(orderId: number): void {
    if (confirm('Confirm that you have received this delivery?')) {
      this.orderService.updateDeliveryStatus(orderId, true).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Delivery confirmed successfully');
            this.loadOrders();
          } else {
            alert('Failed to confirm delivery: ' + response.message);
          }
        },
        error: (error) => {
          alert('Error confirming delivery');
          console.error('Error:', error);
        }
      });
    }
  }

  reportDeliveryIssue(orderId: number): void {
    if (confirm('Report that there was an issue with this delivery?')) {
      this.orderService.updateDeliveryStatus(orderId, false).subscribe({
        next: (response) => {
          if (response.success) {
            alert('Delivery issue reported successfully');
            this.loadOrders();
          } else {
            alert('Failed to report delivery issue: ' + response.message);
          }
        },
        error: (error) => {
          alert('Error reporting delivery issue');
          console.error('Error:', error);
        }
      });
    }
  }

  selectOrder(order: Order): void {
    this.selectedOrder = order;
  }

  clearSelection(): void {
    this.selectedOrder = null;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'new':
        return 'bg-primary';
      case 'assigned':
        return 'bg-warning';
      case 'delivered':
        return 'bg-success';
      case 'failed':
        return 'bg-danger';
      default:
        return 'bg-secondary';
    }
  }
}