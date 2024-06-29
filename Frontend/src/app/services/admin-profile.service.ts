

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminProfileService {
  private apiUrl = 'http://localhost:8000/api/admin/profile'; // Adjust URL as per your Laravel API

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getAllAdminProfiles(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getAdminProfile(): Observable<any> { // No need for ID since it's based on the authenticated user
    const headers = this.getHeaders();
    return this.http.get<any>(`${this.apiUrl}/show`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  updateAdminProfile(adminProfile: any): Observable<any> {
    const headers = this.getHeaders();
    // Do not set 'Content-Type' header when sending FormData
    return this.http.post<any>(`${this.apiUrl}/update`, adminProfile, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


}
