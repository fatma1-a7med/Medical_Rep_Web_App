import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/admin/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.saveToken(response.token); // Save the token to local storage
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  register(adminData: any): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/admin/register`, adminData);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
