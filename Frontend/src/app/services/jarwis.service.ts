// JarwisService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient , private router: Router) {}

  signup(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, data);
  }
  sendResetLink(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/password/email`, { email });
  }
  resetPassword(token: string, email: string, password: string, password_confirmation: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/password/reset/${token}`, {
      email,
      password,
      password_confirmation,
      token 
    });
  }
  logout() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.baseUrl}/logout`, {}, { headers }).subscribe(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/admin/login']);
      },
      (error) => {
        console.error('Logout failed', error);
      }
    );
  }
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get(`${this.baseUrl}/me`, { headers });
  }

}
