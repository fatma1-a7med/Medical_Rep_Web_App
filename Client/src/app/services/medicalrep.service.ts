import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MedicalrepService {

  constructor(private _http:HttpClient) { }
    addMedrep(data:any):Observable<any>{
         return this._http.post('http://localhost:3000/medreps',data)  
    
  }
}
