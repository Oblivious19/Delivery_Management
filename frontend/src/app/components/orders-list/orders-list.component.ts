// components/orders-list/orders-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Order, CreateOrderRequest, mapBackendStatusToFrontend, mapFrontendStatusToBackend } from '../../models/order.model';
import { DeliveryPerson } from '../../models/delivery-person.model';
import { Customer } from '../../models/customer.model';
import { ApiProviderService } from '../../services/api-provider.service';

interface Statistics {
  total: number;
  pending: number;
  inProgress: number;
  delivered: number;
}

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  customers: Customer[] = [];
  deliveryPersons: DeliveryPerson[] = [];
  statistics: Statistics = {
    total: 0,
    pending: 0,
    inProgress: 0,
    delivered: 0
  };
  searchTerm: string = '';
  statusFilter: string = 'all';
  selectedDeliveryPersonId: string = '';
  showAddOrderModal: boolean = false;
  newOrder: CreateOrderRequest = {
    customerName: '',
    orderAmount: 0,
    orderDate: new Date().toISOString(),
    orderStatus: 'pending',
    paymentMode: 'CASH',
    deliveryAddress: ''
  };

  constructor(
    private apiProvider: ApiProviderService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadCustomers();
    this.loadDeliveryPersons();
  }

  loadOrders(): void {
    this.apiProvider.getAllOrders().subscribe({
      next: (orders) => {
        // Map backend status to frontend status
        this.orders = orders.map(order => {
          if (order.status) {
            order.orderStatus = mapBackendStatusToFrontend(order.status);
          }
          return order;
        });
        this.updateStatistics();
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  loadCustomers(): void {
    this.apiProvider.getAllCustomers().subscribe({
      next: (customers) => {
        this.customers = customers;
      },
      error: (error) => {
        console.error('Error loading customers:', error);
      }
    });
  }

  loadDeliveryPersons(): void {
    this.apiProvider.getAllDeliveryPersons().subscribe({
      next: (deliveryPersons) => {
        this.deliveryPersons = deliveryPersons;
      },
      error: (error) => {
        console.error('Error loading delivery persons:', error);
      }
    });
  }

  updateStatistics(): void {
    this.statistics = {
      total: this.orders.length,
      pending: this.orders.filter(order => order.orderStatus === 'pending').length,
      inProgress: this.orders.filter(order => 
        order.orderStatus === 'in-progress' || order.orderStatus === 'assigned'
      ).length,
      delivered: this.orders.filter(order => order.orderStatus === 'delivered').length
    };
  }

  filterOrders(): Order[] {
    return this.orders.filter(order => {
      const matchesSearch = !this.searchTerm || 
        order.customerName?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        order.id.toString().includes(this.searchTerm);
      
      const matchesStatus = this.statusFilter === 'all' || 
        order.orderStatus === this.statusFilter ||
        (this.statusFilter === 'in-progress' && order.orderStatus === 'assigned');
      
      return matchesSearch && matchesStatus;
    });
  }

  assignDeliveryPerson(orderId: string): void {
    if (!this.selectedDeliveryPersonId) return;
    
    this.apiProvider.assignDeliveryPerson(orderId, this.selectedDeliveryPersonId).subscribe({
      next: () => {
        this.loadOrders();
        this.selectedDeliveryPersonId = '';
      },
      error: (error) => {
        console.error('Error assigning delivery person:', error);
      }
    });
  }

  updateOrderStatus(orderId: string, status: string): void {
    // Map frontend status to backend status
    const backendStatus = mapFrontendStatusToBackend(status);
    
    this.apiProvider.updateOrderStatus(orderId, backendStatus).subscribe({
      next: () => {
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error updating order status:', error);
      }
    });
  }

  deleteOrder(orderId: string): void {
    if (confirm('Are you sure you want to delete this order?')) {
      this.apiProvider.deleteOrder(orderId).subscribe({
        next: () => {
          this.loadOrders();
        },
        error: (error) => {
          console.error('Error deleting order:', error);
        }
      });
    }
  }

  openAddOrderModal(): void {
    this.showAddOrderModal = true;
  }

  closeAddOrderModal(): void {
    this.showAddOrderModal = false;
    this.newOrder = {
      customerName: '',
      orderAmount: 0,
      orderDate: new Date().toISOString(),
      orderStatus: 'pending',
      paymentMode: 'CASH',
      deliveryAddress: ''
    };
  }

  addOrder(): void {
    const order: CreateOrderRequest = {
      customerName: this.newOrder.customerName,
      orderAmount: this.newOrder.orderAmount,
      orderDate: this.newOrder.orderDate,
      orderStatus: 'pending',
      paymentMode: this.newOrder.paymentMode,
      deliveryAddress: this.newOrder.deliveryAddress
    };

    this.apiProvider.createOrder(order).subscribe({
      next: () => {
        this.loadOrders();
        this.closeAddOrderModal();
      },
      error: (error) => {
        console.error('Error creating order:', error);
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'in-progress':
        return 'in-progress';
      case 'delivered':
        return 'delivered';
      case 'cancelled':
        return 'cancelled';
      case 'assigned':
        return 'assigned';
      default:
        return 'pending';
    }
  }
}