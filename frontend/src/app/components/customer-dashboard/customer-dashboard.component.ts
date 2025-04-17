// components/customer-dashboard/customer-dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class CustomerDashboardComponent implements OnInit {
  customerId: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.customerId = this.authService.getCustomerId();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
