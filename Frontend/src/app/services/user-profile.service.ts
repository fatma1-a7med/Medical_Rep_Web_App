import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/user/profile';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    // Ensure correct string interpolation for Authorization header
    return new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
  }

  getUserProfile(): Observable<any> {
    const headers = this.getHeaders();
    // Use backticks for URL and interpolate apiUrl
    return this.http.get<any>(`${this.apiUrl}/show`, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  updateUserProfile(userProfile: any): Observable<any> {
    const headers = this.getHeaders();
    // Use backticks for URL and interpolate apiUrl
    return this.http.post<any>(`${this.apiUrl}/update`, userProfile, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // You can add a logout method here if needed
}
