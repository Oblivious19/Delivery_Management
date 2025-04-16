// components/order-form/order-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {
  orderForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  customerId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {
    this.orderForm = this.formBuilder.group({
      orderAmount: ['', [Validators.required, Validators.min(1)]],
      paymentMode: ['cod', Validators.required]
    });
  }

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId();
    if (!this.customerId) {
      this.errorMessage = 'Customer ID not found.';
    }
  }

  onSubmit(): void {
    if (this.orderForm.invalid || !this.customerId) {
      return;
    }

    const formValue = this.orderForm.value;
    
    // Generate a random order ID (this would typically be handled by the backend)
    const orderId = Math.floor(Math.random() * 10000);
    
    const order = {
      orderId: orderId,
      customerId: this.customerId,
      orderAmount: formValue.orderAmount,
      paymentMode: formValue.paymentMode,
      orderDate: new Date().toISOString()
    };

    this.isLoading = true;
    this.errorMessage = '';

    this.orderService.createOrder(order).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response.success) {
          alert('Order placed successfully!');
          this.router.navigate(['/customer/orders']);
        } else {
          this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to place order. Please try again.';
        console.error('Error placing order:', error);
      }
    });
  }
}