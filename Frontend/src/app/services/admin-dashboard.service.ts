import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  private baseUrl = 'http://localhost:8000/api/admin';
  private usersUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
    //sales
    getSales(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/sales`, { headers: this.getAuthHeaders() });
    }
  
    getSale(id: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/sales/${id}`, { headers: this.getAuthHeaders() });
    }
  
    createSale(sale: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/sales`, sale, { headers: this.getAuthHeaders() });
    }
  
    updateSale(id: number, sale: any): Observable<any> {
      return this.http.put<any>(`${this.baseUrl}/sales/${id}`, sale, { headers: this.getAuthHeaders() });
    }
  
    deleteSale(id: number): Observable<any> {
      return this.http.delete<any>(`${this.baseUrl}/sales/${id}`, { headers: this.getAuthHeaders() });
    }
  
    getUsers(): Observable<any[]> {
      return this.http.get<any[]>(`${this.usersUrl}/users`, { headers: this.getAuthHeaders() });
    }
    
    getTools(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/tools`);
    }
  
    getSalesByUserId(userId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/users/${userId}/sales`, { headers: this.getAuthHeaders() });
    }
    getUsersByAdmin(adminId: number): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/${adminId}/users`, { headers: this.getAuthHeaders() });
    }
    getUserInfo(userId: number): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/sales/user-info/${userId}`, { headers: this.getAuthHeaders() });
    }
    me(): Observable<any> {
      return this.http.get<any>(`${this.baseUrl}/me`, { headers: this.getAuthHeaders() });
    }
    //visit
    getAllVisits(): Observable<any> {
    
      return this.http.get<any>(`http://localhost:8000/api/admin/visits`, { headers: this.getAuthHeaders() })  
    }

 
    


    //admin tools
    getAllTools(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/tools`);  
    }
 
    addTool(body: any): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/addTool`, body, );  
    }
    
    updateTool(id: number, tool: any): Observable<any> {
    
      return this.http.put<any>(`http://localhost:8000/api/admin/updateTool/${id}`, tool)  
    }

    deleteTool(id: number): Observable<any> {
    
      return this.http.delete<any>(`http://localhost:8000/api/admin/deleteTool/${id}`)  
    }
  }

