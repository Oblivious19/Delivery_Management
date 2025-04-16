// guards/customer.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (!this.authService.checkIsAdmin() && this.authService.getCustomerId()) {
      return true;
    }
    
    this.router.navigate(['/']);
    return false;
  }
}