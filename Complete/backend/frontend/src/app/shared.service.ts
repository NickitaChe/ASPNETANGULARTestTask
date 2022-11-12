import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DomElementSchemaRegistry } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl = "http://localhost:5000"

  constructor(private http:HttpClient) { }

  getEmpList():Observable<any[]>{
    var a=this.http.get<any>(this.APIUrl + '/api/employees')
      console.log(a);
    return a;
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/api/employees',val);
  }

  editEmployee(val:any){
    return this.http.put(this.APIUrl+'/api/employees',val);
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/api/employees?id='+val);
  }
}
