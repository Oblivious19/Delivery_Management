// models/login.model.ts
export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    token?: string;
    customerId?: string;
    isAdmin?: boolean;
  }