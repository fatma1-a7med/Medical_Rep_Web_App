import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private baseUrl = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sales`);
  }

  getSaleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/sales/${id}`);
  }
  getCurrentUserId(): Observable<{ user_id: string }> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming token is stored in localStorage
    });

    return this.http.get<{ user_id: string }>(`${this.baseUrl}/info`, { headers })
      .pipe(
        catchError(error => {
          console.error('Error fetching user:', error);
          return throwError(error);
        })
      );
  }
}
