import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface LoginData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserAuthServicesService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/user/login`, { email, password }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); // Save token to localStorage
          localStorage.setItem('user_id', response.user_id);
        }
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }


  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
  }

  

}