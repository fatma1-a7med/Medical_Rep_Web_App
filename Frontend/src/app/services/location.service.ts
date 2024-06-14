import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private apiUrl = 'http://127.0.0.1:8000/api/admin/location';

  constructor(private http: HttpClient) { }
  
  fetchUserLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
