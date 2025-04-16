// components/orders-list/orders-list.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { Order } from '../../models/order.model';
import { DeliveryPerson } from '../../models/delivery-person.model';
import { Customer } from '../../models/customer.model';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  orders: Order[] = [];
  deliveryPersons: DeliveryPerson[] = [];
  customers: Customer[] = [];
  isLoading = true;
  errorMessage = '';
  statusFilter = '';
  searchTerm = '';
  selectedDeliveryPerson = '';
  selectedOrder: Order | null = null;

  constructor(
    private orderService: OrderService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.loadOrders();
    this.loadDeliveryPersons();
    this.loadCustomers();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.orderService.getAllOrders().subscribe({
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

  loadDeliveryPersons(): void {
    this.orderService.getAvailableDeliveryPersons().subscribe({
      next: (data) => {
        this.deliveryPersons = data;
      },
      error: (error) => {
        console.error('Error loading delivery persons:', error);
      }
    });
  }

  loadCustomers(): void {
    this.customerService.getAllCustomers().subscribe({
        next: (data) => {
            this.customers = data;
          },
          error: (error) => {
            console.error('Error loading customers:', error);
          }
        });
      }
    
      getCustomerName(customerId: string): string {
        const customer = this.customers.find(c => c.customerId === customerId);
        return customer ? customer.customerName : 'Unknown';
      }
    
      filterOrders(): Order[] {
        return this.orders.filter(order => {
          const statusMatch = this.statusFilter ? order.orderStatus === this.statusFilter : true;
          const searchMatch = this.searchTerm ? 
            order.orderId.toString().includes(this.searchTerm) || 
            (order.customerId && order.customerId.toLowerCase().includes(this.searchTerm.toLowerCase())) : 
            true;
          return statusMatch && searchMatch;
        });
      }
    
      assignDeliveryPerson(orderId: number): void {
        if (!this.selectedDeliveryPerson) {
          alert('Please select a delivery person');
          return;
        }
    
        this.orderService.updateOrder(orderId, {
          deliveryPersonId: this.selectedDeliveryPerson,
          orderStatus: 'assigned'
        }).subscribe({
          next: (response) => {
            if (response.success) {
              alert('Delivery person assigned successfully');
              this.loadOrders();
              this.loadDeliveryPersons();
            } else {
              alert('Failed to assign delivery person: ' + response.message);
            }
          },
          error: (error) => {
            alert('Error assigning delivery person');
            console.error('Error:', error);
          }
        });
      }
    
      updateOrderStatus(orderId: number, status: string): void {
        this.orderService.updateOrder(orderId, { orderStatus: status }).subscribe({
          next: (response) => {
            if (response.success) {
              alert('Order status updated successfully');
              this.loadOrders();
            } else {
              alert('Failed to update order status: ' + response.message);
            }
          },
          error: (error) => {
            alert('Error updating order status');
            console.error('Error:', error);
          }
        });
      }
    
      deleteOrder(orderId: number): void {
        if (confirm('Are you sure you want to delete this order?')) {
          this.orderService.deleteOrder(orderId).subscribe({
            next: (response) => {
              if (response.success) {
                alert('Order deleted successfully');
                this.loadOrders();
              } else {
                alert('Failed to delete order: ' + response.message);
              }
            },
            error: (error) => {
              alert('Error deleting order');
              console.error('Error:', error);
            }
          });
        }
      }
    
      selectOrder(order: Order): void {
        this.selectedOrder = order;
        this.selectedDeliveryPerson = '';
      }
    
      clearSelection(): void {
        this.selectedOrder = null;
      }
    }