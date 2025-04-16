// services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  private isAdminSubject = new BehaviorSubject<boolean>(this.checkIsAdmin());
  private currentUserSubject = new BehaviorSubject<string | null>(this.getCurrentUser());

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { }

  adminLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/admin/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.success) {
            localStorage.setItem('token', response.token || '');
            localStorage.setItem('isAdmin', 'true');
            this.isLoggedInSubject.next(true);
            this.isAdminSubject.next(true);
            this.currentUserSubject.next('admin');
          }
        })
      );
  }

  customerLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/customers/login`, loginRequest)
      .pipe(
        tap(response => {
          if (response.success) {
            localStorage.setItem('token', response.token || '');
            localStorage.setItem('isAdmin', 'false');
            localStorage.setItem('customerId', response.customerId || '');
            this.isLoggedInSubject.next(true);
            this.isAdminSubject.next(false);
            this.currentUserSubject.next(response.customerId || null);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('customerId');
    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    this.currentUserSubject.next(null);
  }

  hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  checkIsAdmin(): boolean {
    return localStorage.getItem('isAdmin') === 'true';
  }

  getCurrentUser(): string | null {
    return this.checkIsAdmin() ? 'admin' : localStorage.getItem('customerId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCustomerId(): string | null {
    return localStorage.getItem('customerId');
  }
}