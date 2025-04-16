// components/customer-dashboard/customer-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css']
})
export class CustomerDashboardComponent implements OnInit {
  customerId: string | null = null;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId();
  }
}
