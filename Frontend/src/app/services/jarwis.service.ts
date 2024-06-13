// JarwisService.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JarwisService {
  private baseUrl = 'http://localhost:8000/api/admin';

  constructor(private http: HttpClient) {}

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
      password_confirmation
    });
  }


}
