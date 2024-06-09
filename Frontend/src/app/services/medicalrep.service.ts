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


  getMedreplist():Observable<any>{
    return this._http.get('http://localhost:3000/medreps')  

}

updatemedrip(id: number, data: any): Observable<any> {
  return this._http.put(`http://localhost:3000/medreps/${id}`, data);
}


deletemedrip(id:number):Observable<any>{

return this._http.delete(`http://localhost:3000/medreps/${id}`);
}
}
