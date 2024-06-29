import { routes } from './../app.routes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
export interface LoginData {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserAuthServicesService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`http://127.0.0.1:8000/api/user/login`, { email, password }).pipe(
        tap((response: any) => {
          console.log('Response from server:', response);

            if (response && response.token) {
                this.saveToken(response.token); 
                localStorage!.setItem('token', response.token); 
                console.log('Token stored:', localStorage!.getItem('token'));

                // localStorage.setItem('user_id', response.user.id); 
                this.router.navigate(['/user/home']);
            }
        }),
        catchError((error) => {
            console.error('Error during login:', error);
            return throwError(error);
        })
    );
  }

  
  getValue(key: string): string | null {
    return localStorage!.getItem(key);
  }


  getToken(): string | null {
    return localStorage!.getItem('token');
  }


  saveToken(token: string) {
    localStorage!.setItem('token', token);
  }

 

  logout() {
    localStorage.clear();
  }



  isUser(): boolean {
    // Check if user is regular user (implement based on your logic)
    const role = localStorage!.getItem('role');
    return role === 'user';
  }

  isLoggedIn(): boolean {
    return !!localStorage!.getItem('token');
  }
}

