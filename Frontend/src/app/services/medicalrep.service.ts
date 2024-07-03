// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';  
// import { Observable, catchError, throwError } from 'rxjs';
// @Injectable({
//   providedIn: 'root'
// })
// export class MedicalrepService {
 
//   constructor(private _http:HttpClient) { }
//    private apiUrl = 'http://localhost:8000/api/admin'

//   private getAuthHeaders(): HttpHeaders {
//     const token = localStorage.getItem('token'); 
//     return new HttpHeaders({
//       'Authorization': `Bearer ${token}`
//     });
//   }
    
//   addMedrep(data:any):Observable<any>{
//          return this._http.post('http://localhost:8000/api/users',data, { headers: this.getAuthHeaders() })  
    
//   }

  

//   getMedreplist():Observable<any>{
//     return this._http.get('http://localhost:8000/api/users', { headers: this.getAuthHeaders() })  

// }

// updatemedrip(id: number, data: any): Observable<any> {
//   return this._http.post(`http://localhost:8000/api/users/${id}?_method=PUT`, data, { headers: this.getAuthHeaders() });
// }


// deletemedrip(id:number):Observable<any>{

// return this._http.delete(`http://localhost:8000/api/users/${id}`, { headers: this.getAuthHeaders() });
// }

// getStates(): Observable<any> {
//   return this._http.get<any>(`${this.apiUrl}/states`).pipe(
//     catchError(this.handleError)
//   );
// }

// getCities(stateId: number): Observable<any> {
//   return this._http.get<any>(`${this.apiUrl}/cities/${stateId}`).pipe(
//     catchError(this.handleError)
//   );
// }

// private handleError(error: HttpErrorResponse) {
//   console.error('An error occurred:', error);
//   return throwError(() => new Error('Something went wrong; please try again later.'));
// }



// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';  
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MedicalrepService {
 
  private apiUrl = 'http://localhost:8000/api/admin';

  constructor(private _http: HttpClient) { }

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
    
  addMedrep(data: any): Observable<any> {
    return this._http.post('http://localhost:8000/api/users', data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getMedreplist(): Observable<any> {
    return this._http.get('http://localhost:8000/api/users', { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  updateMedrep(id: number, data: any): Observable<any> {
    return this._http.post(`http://localhost:8000/api/users/${id}?_method=PUT`, data, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  deleteMedrep(id: number): Observable<any> {
    return this._http.delete(`http://localhost:8000/api/users/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getStates(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/states`,  { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getCities(stateId: number): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/cities/${stateId}` , { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}

