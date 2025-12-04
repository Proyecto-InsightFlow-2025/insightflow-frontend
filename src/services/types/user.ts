
export interface CreateUserRequest {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    password: string;
    dateOfBirth: string;
    address: string;
    phoneNumber: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    dateOfBirth?: string;
    address?: string;
    phoneNumber?: string;
    isActive?: boolean;
  }
  
  export interface LoginResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
  }