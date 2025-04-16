import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { Order } from '../../models/order.model';
import { DeliveryPerson } from '../../models/delivery-person.model';
import { Customer } from '../../models/customer.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  orderId: number | null = null;
  order: Order | null = null;
  isLoading = true;
  errorMessage = '';
  customer: Customer | null = null;
  deliveryPerson: DeliveryPerson | null = null;
  isAdmin = false;
  availableDeliveryPersons: DeliveryPerson[] = [];
  selectedDeliveryPersonId: number | null = null;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private customerService: CustomerService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe(isAdmin => {
      this.isAdmin = isAdmin;
    });
    
    this.route.params.subscribe(params => {
      this.orderId = +params['id'];
      this.loadOrderDetails();
      if (this.isAdmin) {
        this.loadAvailableDeliveryPersons();
      }
    });
  }

  loadOrderDetails(): void {
    if (!this.orderId) return;
    
    this.isLoading = true;
    this.orderService.getOrderById(this.orderId).subscribe({
      next: (data) => {
        this.order = data;
        if (this.order.customerId) {
          this.loadCustomerDetails();
        }
        if (this.order.deliveryPersonId) {
          this.loadDeliveryPersonDetails();
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load order details. Please try again later.';
        console.error('Error loading order:', error);
        this.isLoading = false;
      }
    });
  }

  loadCustomerDetails(): void {
    if (!this.order || !this.order.customerId) return;
    
    this.customerService.getCustomerById(this.order.customerId).subscribe({
      next: (data) => {
        this.customer = data;
      },
      error: (error) => {
        console.error('Error loading customer details:', error);
      }
    });
  }

  loadDeliveryPersonDetails(): void {
    if (!this.order || !this.order.deliveryPersonId) return;
    
    this.orderService.getDeliveryPersonById(this.order.deliveryPersonId).subscribe({
      next: (data) => {
        this.deliveryPerson = data;
      },
      error: (error) => {
        console.error('Error loading delivery person details:', error);
      }
    });
  }

  loadAvailableDeliveryPersons(): void {
    this.orderService.getAvailableDeliveryPersons().subscribe({
      next: (data) => {
        this.availableDeliveryPersons = data;
      },
      error: (error) => {
        console.error('Error loading available delivery persons:', error);
      }
    });
  }

  updateOrderStatus(status: string): void {
    if (!this.orderId || !this.order) return;
    
    this.isLoading = true;
    const updateData = {
      orderStatus: status,
      deliveryPersonId: this.order.deliveryPersonId
    };
    
    this.orderService.updateOrder(this.orderId, updateData).subscribe({
      next: () => {
        if (this.order) {
          this.order.orderStatus = status;
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to update order status. Please try again.';
        console.error('Error updating order status:', error);
        this.isLoading = false;
      }
    });
  }

  assignDeliveryPerson(): void {
    if (!this.orderId || !this.selectedDeliveryPersonId || !this.order) return;
    
    this.isLoading = true;
    const updateData = {
      orderStatus: this.order.orderStatus,
      deliveryPersonId: this.selectedDeliveryPersonId
    };
    
    this.orderService.updateOrder(this.orderId, updateData).subscribe({
      next: () => {
        this.loadOrderDetails(); // Reload the full order details after assignment
      },
      error: (error) => {
        this.errorMessage = 'Failed to assign delivery person. Please try again.';
        console.error('Error assigning delivery person:', error);
        this.isLoading = false;
      }
    });
  }

  confirmDelivery(): void {
    if (!this.orderId) return;
    
    this.isLoading = true;
    const deliveryStatus = { delivered: true };
    
    this.orderService.updateDeliveryStatus(this.orderId, deliveryStatus).subscribe({
      next: () => {
        if (this.order) {
          this.order.orderStatus = 'DELIVERED';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to confirm delivery. Please try again.';
        console.error('Error confirming delivery:', error);
        this.isLoading = false;
      }
    });
  }

  cancelOrder(): void {
    if (!this.orderId || !this.canCancelOrder()) return;
    
    if (confirm('Are you sure you want to cancel this order?')) {
      this.isLoading = true;
      
      // For admin cancel, we use the updateOrder endpoint
      if (this.isAdmin) {
        const updateData = {
          orderStatus: 'CANCELLED',
          deliveryPersonId: this.order?.deliveryPersonId
        };
        
        this.orderService.updateOrder(this.orderId, updateData).subscribe({
          next: () => {
            if (this.order) {
              this.order.orderStatus = 'CANCELLED';
            }
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to cancel order. Please try again.';
            console.error('Error cancelling order:', error);
            this.isLoading = false;
          }
        });
      } else {
        // For customer cancel, we might use a different endpoint or handle differently
        // For now, using the same approach
        const updateData = {
          orderStatus: 'CANCELLED',
          deliveryPersonId: this.order?.deliveryPersonId
        };
        
        this.orderService.updateOrder(this.orderId, updateData).subscribe({
          next: () => {
            if (this.order) {
              this.order.orderStatus = 'CANCELLED';
            }
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Failed to cancel order. Please try again.';
            console.error('Error cancelling order:', error);
            this.isLoading = false;
          }
        });
      }
    }
  }

  canCancelOrder(): boolean {
    if (!this.order) return false;
    
    // Only allow cancellation for pending and processing orders
    return ['PENDING', 'PROCESSING'].includes(this.order.orderStatus);
  }

  canConfirmDelivery(): boolean {
    if (!this.order) return false;
    
    // Only allow delivery confirmation for orders that are shipped/out for delivery
    return this.order.orderStatus === 'SHIPPED' || this.order.orderStatus === 'OUT_FOR_DELIVERY';
  }

  goBack(): void {
    if (this.isAdmin) {
      this.router.navigate(['/admin/orders']);
    } else {
      this.router.navigate(['/customer/orders']);
    }
  }

  deleteOrder(): void {
    if (!this.orderId) return;
    
    if (confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      this.isLoading = true;
      
      this.orderService.deleteOrder(this.orderId).subscribe({
        next: () => {
          this.isLoading = false;
          this.goBack();
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete order. Please try again.';
          console.error('Error deleting order:', error);
          this.isLoading = false;
        }
      });
    }
  }
}