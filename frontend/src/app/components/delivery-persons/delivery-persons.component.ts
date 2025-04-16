// components/delivery-persons/delivery-persons.component.ts
import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DeliveryPerson } from '../../models/delivery-person.model';

@Component({
  selector: 'app-delivery-persons',
  templateUrl: './delivery-persons.component.html',
  styleUrls: ['./delivery-persons.component.css']
})
export class DeliveryPersonsComponent implements OnInit {
  deliveryPersons: DeliveryPerson[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.loadDeliveryPersons();
  }

  loadDeliveryPersons(): void {
    this.isLoading = true;
    this.orderService.getAvailableDeliveryPersons().subscribe({
      next: (data) => {
        this.deliveryPersons = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load delivery persons.';
        this.isLoading = false;
        console.error('Error loading delivery persons:', error);
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-success';
      case 'busy':
        return 'bg-warning';
      default:
        return 'bg-secondary';
    }
  }
}