import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
