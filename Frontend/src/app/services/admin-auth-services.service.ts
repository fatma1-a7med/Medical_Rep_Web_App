import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthServiceService {
  private apiUrl = 'http://127.0.0.1:8000/api/admin'; // Assuming this is your API base URL

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token); 
          this.router.navigate(['/admin/admin-dashboard']);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  register(adminData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, adminData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  isAdmin(): any {
    tap((response: any) => {
      if (response && response.token) {
        this.saveToken(response.token); 
      }
    }),
    catchError((error) => {
      return throwError(error);
    });
  
}
  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}



