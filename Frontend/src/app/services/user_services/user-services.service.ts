import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8000/api/user';

  constructor(private http: HttpClient) {}

  getAllSales(): Observable<any> {
    return this.http.get(`${this.baseUrl}/sales`);
  }

  getSaleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/sales/${id}`);
  }

  //doctor
  AddDoctor(doctor:any): Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/add-doctor`, doctor);
  }

  ListAllDoctors(): Observable<any>{
    return this.http.get(`${this.baseUrl}/get-all-doctors`)
  }

  GetDoctorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/get-doctor-byId/${id}`);
  }

  updateDoctor(id:number, body:any): Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/update-doctor-byId/${id}`, body)
  }
  
  deleteDoctor(id:number): Observable <any>{
    return this.http.delete<any>(`${this.baseUrl}/delete-doctor-byId/${id}`)
  }
}
