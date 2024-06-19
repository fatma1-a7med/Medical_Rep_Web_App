import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  private iss = {
    login: 'http://localhost:8000/api/admin/login',
    register: 'http://localhost:8000/api/admin/register'
  };

  handle(token: string) {
    this.set(token);
  }

  set(token: string) {
    localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
    
  }

  remove() {
    localStorage.removeItem('token');
  }
  isTokenStructureValid(token: string): boolean {
    // Check if token has three parts separated by dots
    return token.split('.').length === 3;
  }
  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return Object.values(this.iss).includes(payload.iss);
      }
    }
    return false;
  }

  payload(token: string) {
    try {
      const payload = token.split('.')[1];
      return this.decode(payload);
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }

  decode(payload: string) {
    try {
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('Error decoding token payload:', error);
      return null;
    }
  }

  loggedIn() {
    return this.isValid();
  }

 
  
 
  getUserInfo(): any {
    const token = this.get();
    if (token && this.isTokenStructureValid(token)) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      console.error('Invalid token structure');
    }
    return null;
  }
  
}
