import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


// Define an interface for login data
export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminAuthServiceService {
  private apiUrl = 'http://localhost:8000/api/admin';


  constructor(private http: HttpClient, private router: Router) { }

   
    login(email: string, password: string): Observable<any> {
      return this.http.post(`http://127.0.0.1:8000/api/admin/login`, { email, password }).pipe(
        tap((response: any) => {
          console.log('Response from server:', response);
          if (response && response.token) {
            localStorage.setItem('token', response.token); 
            console.log('Token stored:', localStorage.getItem('token'));
            this.router.navigate(['/admin-dashboard']); // Ensure the navigation happens here
          }
        }),
        catchError((error) => {
          console.error('Error during login:', error);
          return throwError(error);
        })
      );
    }

    
  getValue(key: string): string | null {
    return localStorage.getItem(key);
  }
  
    getToken(): string | null {
      return localStorage.getItem('auth_token');
    }   
     logout(): void {
      localStorage.removeItem('auth_token'); // Remove token from localStorage on logout
      this.router.navigate(['/admin/login']);
    }
  
    isLoggedIn(): boolean {
      return !!localStorage.getItem('auth_token'); // Check if token exists in localStorage
    }
  

   register(adminData: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/admin/register`, adminData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }
 
}
